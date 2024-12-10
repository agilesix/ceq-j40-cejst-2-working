import pytest
import pandas as pd
import geopandas as gpd
from pathlib import Path
from data_pipeline.etl.sources.census_acs.etl import CensusACSETL


def _check_fields_exist(df: pd.DataFrame, field_names: list):
    for field in field_names:
        assert field in df.columns


@pytest.fixture
def transform_census_input_fixture() -> pd.DataFrame:
    """
    Load the Census input data for the transform method tests.

    Returns:
        Dataframe: the input data
    """
    file = (
        Path(__file__).parents[0]
        / "data"
        / "transform"
        / "acs_transform_input.pkl"
    )
    return pd.read_pickle(file)


@pytest.fixture
def transform_census_geojson_fixture() -> gpd.GeoDataFrame:
    """
    Load the Census GeoJSON input data for the transform method.

    Returns:
        Dataframe: the Census GeoJSON input data
    """
    file = (
        Path(__file__).parents[0]
        / "data"
        / "transform"
        / "acs_transform_geojson.geojson"
    )
    return gpd.read_file(file)


@pytest.fixture
def transformed_data_fixture(
    transform_census_input_fixture: pd.DataFrame,
    transform_census_geojson_fixture: gpd.GeoDataFrame,
) -> pd.DataFrame:
    """
    Tranform the test input data.

    Returns:
        DataFrame: the transformed data
    """
    acs = CensusACSETL()
    acs.df = transform_census_input_fixture
    acs.geo_df = transform_census_geojson_fixture
    acs.transform()
    return acs.output_df


#################
# Transform tests
#################
def test_poverty_fields(transformed_data_fixture: pd.DataFrame):
    result = transformed_data_fixture

    # Test that the poverty and collect fields were added.
    acs = CensusACSETL()
    fields_to_test = [
        acs.POVERTY_LESS_THAN_200_PERCENT_FPL_COUNT_FIELD_NAME,
        acs.POVERTY_LESS_THAN_100_PERCENT_FPL_COUNT_FIELD_NAME,
    ]
    _check_fields_exist(result, fields_to_test)

    assert (
        result.iloc[0][acs.POVERTY_LESS_THAN_200_PERCENT_FPL_COUNT_FIELD_NAME]
        == 1743
    )
    assert (
        result.iloc[0][acs.POVERTY_LESS_THAN_100_PERCENT_FPL_COUNT_FIELD_NAME]
        == 700
    )

    assert (
        result.iloc[1][acs.POVERTY_LESS_THAN_200_PERCENT_FPL_COUNT_FIELD_NAME]
        == 941
    )
    assert (
        result.iloc[1][acs.POVERTY_LESS_THAN_100_PERCENT_FPL_COUNT_FIELD_NAME]
        == 548
    )


def test_college_undergrad_fields(transformed_data_fixture: pd.DataFrame):
    result = transformed_data_fixture

    # Test that the poverty and collect fields were added.
    acs = CensusACSETL()
    fields_to_test = [
        acs.OFFCAMPUS_UNDERGRADUATE_POVERTY_FIELD,
        acs.OFFCAMPUS_UNDERGRADUATE_FIELD,
        acs.OFFCAMPUS_UNIVERSITY_POVERTY_FIELD,
        acs.OFFCAMPUS_UNIVERSITY_FIELD,
    ]
    _check_fields_exist(result, fields_to_test)

    assert result.iloc[0][acs.OFFCAMPUS_UNDERGRADUATE_POVERTY_FIELD] == 0
    assert result.iloc[0][acs.OFFCAMPUS_UNDERGRADUATE_FIELD] == 296
    assert result.iloc[0][acs.OFFCAMPUS_UNIVERSITY_POVERTY_FIELD] == 44
    assert result.iloc[0][acs.OFFCAMPUS_UNIVERSITY_FIELD] == 340

    assert result.iloc[1][acs.OFFCAMPUS_UNDERGRADUATE_POVERTY_FIELD] == 45
    assert result.iloc[1][acs.OFFCAMPUS_UNDERGRADUATE_FIELD] == 97
    assert result.iloc[1][acs.OFFCAMPUS_UNIVERSITY_POVERTY_FIELD] == 45
    assert result.iloc[1][acs.OFFCAMPUS_UNIVERSITY_FIELD] == 128
