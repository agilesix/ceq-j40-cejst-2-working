from pathlib import Path
import pandas as pd

from data_pipeline.config import settings
from data_pipeline.etl.base import ExtractTransformLoad
from data_pipeline.utils import get_module_logger, unzip_file_from_url

logger = get_module_logger(__name__)


class DOEEnergyBurden(ExtractTransformLoad):
    def __init__(self):
        self.DOE_FILE_URL = (
            settings.AWS_JUSTICE40_DATASOURCES_URL
            + "/DOE_LEAD_with_EJSCREEN.csv.zip"
        )

        self.OUTPUT_PATH: Path = (
            self.DATA_PATH / "dataset" / "doe_energy_burden"
        )

        self.TRACT_INPUT_COLUMN_NAME = "GEOID"
        self.ENERGY_BURDEN_FIELD_NAME = "Energy burden"

        # Constants for output
        self.COLUMNS_TO_KEEP = [
            self.GEOID_TRACT_FIELD_NAME,
            self.ENERGY_BURDEN_FIELD_NAME,
        ]

        self.raw_df: pd.DataFrame
        self.output_df: pd.DataFrame

    def extract(self) -> None:
        logger.info("Starting data download.")

        unzip_file_from_url(
            file_url=self.DOE_FILE_URL,
            download_path=self.TMP_PATH,
            unzipped_file_path=self.TMP_PATH / "doe_energy_burden",
        )

        self.raw_df = pd.read_csv(
            filepath_or_buffer=self.TMP_PATH
            / "doe_energy_burden"
            / "DOE_LEAD_with_EJSCREEN.csv",
            # The following need to remain as strings for all of their digits, not get converted to numbers.
            dtype={
                self.TRACT_INPUT_COLUMN_NAME: "string",
            },
            low_memory=False,
        )

    def transform(self) -> None:
        logger.info("Starting transforms.")

        output_df = self.raw_df.rename(
            columns={
                "AvgEnergyBurden": self.ENERGY_BURDEN_FIELD_NAME,
                self.TRACT_INPUT_COLUMN_NAME: self.GEOID_TRACT_FIELD_NAME,
            }
        )

        # Convert energy burden to a fraction, since we represent all other percentages as fractions.
        output_df[self.ENERGY_BURDEN_FIELD_NAME] = (
            output_df[self.ENERGY_BURDEN_FIELD_NAME] / 100
        )

        # Left-pad the tracts with 0s
        expected_length_of_census_tract_field = 11
        output_df[self.GEOID_TRACT_FIELD_NAME] = (
            output_df[self.GEOID_TRACT_FIELD_NAME]
            .astype(str)
            .apply(lambda x: x.zfill(expected_length_of_census_tract_field))
        )

        self.output_df = output_df

    def validate(self) -> None:
        logger.info("Validating DOE Energy Burden Data")

        pass

    def load(self) -> None:
        logger.info("Saving DOE Energy Burden CSV")

        self.OUTPUT_PATH.mkdir(parents=True, exist_ok=True)
        self.output_df[self.COLUMNS_TO_KEEP].to_csv(
            path_or_buf=self.OUTPUT_PATH / "usa.csv", index=False
        )