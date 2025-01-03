import functools

import pandas as pd
from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.etl.datasource import DataSource
from data_pipeline.etl.datasource import ZIPDataSource
from data_pipeline.etl.base import ValidGeoLevel
from data_pipeline.utils import get_module_logger

logger = get_module_logger(__name__)


class PersistentPovertyETL(ExtractTransformLoad):
    """Persistent poverty data.

    Loaded from `https://s4.ad.brown.edu/Projects/Diversity/Researcher/LTDB.htm`.

    Codebook: `https://s4.ad.brown.edu/Projects/Diversity/Researcher/LTBDDload/Dfiles/codebooks.pdf`.
    """

    NAME = "persistent_poverty"
    GEO_LEVEL: ValidGeoLevel = ValidGeoLevel.CENSUS_TRACT
    PUERTO_RICO_EXPECTED_IN_DATA = False

    def __init__(self):

        # fetch
        self.poverty_url = (
            settings.AWS_JUSTICE40_DATASOURCES_URL + "/LTDB_Std_All_Sample.zip"
        )

        # source
        self.poverty_sources = [
            self.get_sources_path()
            / "ltdb_std_all_sample"
            / "ltdb_std_1990_sample.csv",
            self.get_sources_path()
            / "ltdb_std_all_sample"
            / "ltdb_std_2000_sample.csv",
            self.get_sources_path()
            / "ltdb_std_all_sample"
            / "ltdb_std_2010_sample.csv",
        ]

        # output
        self.OUTPUT_PATH = self.DATA_PATH / "dataset" / "persistent_poverty"

        # Need to change hyperlink to S3
        # self.GEOCORR_PLACES_URL = "https://justice40-data.s3.amazonaws.com/data-sources/persistent_poverty_urban_rural.csv.zip"
        self.GEOID_TRACT_INPUT_FIELD_NAME_1 = "TRTID10"
        self.GEOID_TRACT_INPUT_FIELD_NAME_2 = "tractid"
        # self.URBAN_HEURISTIC_FIELD_NAME = "Urban Heuristic Flag"

        self.POVERTY_PREFIX = "Individuals in Poverty (percent)"
        self.PERSISTENT_POVERTY_FIELD = "Persistent Poverty Census Tract"

        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            f"{self.POVERTY_PREFIX} (1990)",
            f"{self.POVERTY_PREFIX} (2000)",
            f"{self.POVERTY_PREFIX} (2010)",
            self.PERSISTENT_POVERTY_FIELD,
        ]

        self.df: pd.DataFrame

    def get_data_sources(self) -> [DataSource]:
        return [
            ZIPDataSource(
                source=self.poverty_url, destination=self.get_sources_path()
            )
        ]

    def _join_input_dfs(self, dfs: list) -> pd.DataFrame:
        df = functools.reduce(
            lambda df_a, df_b: pd.merge(
                left=df_a,
                right=df_b,
                # All data frames will now have this field for tract.
                on=self.GEOID_TRACT_FIELD_NAME,
                how="outer",
            ),
            dfs,
        )

        # Left-pad the tracts with 0s
        expected_length_of_census_tract_field = 11
        df[self.GEOID_TRACT_FIELD_NAME] = (
            df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_length_of_census_tract_field))
        )

        # Sanity check the join.
        if len(df[self.GEOID_TRACT_FIELD_NAME].str.len().unique()) != 1:
            raise ValueError(
                f"One of the input CSVs uses {self.GEOID_TRACT_FIELD_NAME} with a different length."
            )

        if len(df) > self.EXPECTED_MAX_CENSUS_TRACTS:
            raise ValueError(f"Too many rows in the join: {len(df)}")

        return df

    def extract(self, use_cached_data_sources: bool = False) -> None:

        super().extract(
            use_cached_data_sources
        )  # download and extract data sources

        temporary_input_dfs = []

        for file_name in self.poverty_sources:
            temporary_input_df = pd.read_csv(
                filepath_or_buffer=file_name,
                dtype={
                    self.GEOID_TRACT_INPUT_FIELD_NAME_1: "string",
                    self.GEOID_TRACT_INPUT_FIELD_NAME_2: "string",
                },
                low_memory=False,
                encoding="latin1",
            )

            # Some CSVs have self.GEOID_TRACT_INPUT_FIELD_NAME_1 as the name of the tract field,
            # and some have self.GEOID_TRACT_INPUT_FIELD_NAME_2. Rename them both to the same tract name.
            temporary_input_df.rename(
                columns={
                    self.GEOID_TRACT_INPUT_FIELD_NAME_1: self.GEOID_TRACT_FIELD_NAME,
                    self.GEOID_TRACT_INPUT_FIELD_NAME_2: self.GEOID_TRACT_FIELD_NAME,
                },
                inplace=True,
                # Ignore errors b/c of the different field names in different CSVs.
                errors="ignore",
            )

            temporary_input_dfs.append(temporary_input_df)

        self.df = self._join_input_dfs(temporary_input_dfs)

    def transform(self) -> None:
        transformed_df = self.df

        # Note: the fields are defined as following.
        # dpovXX Description: persons for whom poverty status is determined
        # npovXX Description: persons in poverty
        transformed_df[f"{self.POVERTY_PREFIX} (1990)"] = (
            transformed_df["NPOV90"] / transformed_df["DPOV90"]
        )
        transformed_df[f"{self.POVERTY_PREFIX} (2000)"] = (
            transformed_df["NPOV00"] / transformed_df["DPOV00"]
        )
        # Note: for 2010, they use ACS data ending in 2012 that has 2010 as its midpoint year.
        transformed_df[f"{self.POVERTY_PREFIX} (2010)"] = (
            transformed_df["npov12"] / transformed_df["dpov12"]
        )

        poverty_threshold = 0.2

        transformed_df[self.PERSISTENT_POVERTY_FIELD] = (
            (
                transformed_df[f"{self.POVERTY_PREFIX} (1990)"]
                >= poverty_threshold
            )
            & (
                transformed_df[f"{self.POVERTY_PREFIX} (2000)"]
                >= poverty_threshold
            )
            & (
                transformed_df[f"{self.POVERTY_PREFIX} (2010)"]
                >= poverty_threshold
            )
        )

        self.output_df = transformed_df
