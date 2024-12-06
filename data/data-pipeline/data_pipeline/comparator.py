import sys
import click
import pandas as pd
from pathlib import Path

from data_pipeline.etl.score import constants
from data_pipeline.utils import get_module_logger, download_file_from_url
from data_pipeline.application import log_title, log_info, log_goodbye
from data_pipeline.score import field_names

logger = get_module_logger(__name__)

pd.set_option("display.max_columns", None)
pd.set_option("display.max_colwidth", None)
pd.set_option("display.max_rows", None)
pd.set_option("display.width", 10000)
pd.set_option("display.colheader_justify", "left")

result_text = []
WORKING_PATH = constants.TMP_PATH / "Comparator" / "Score"


def _add_text(text: str):
    """Add a line to the output result.

    Args:
        line (str): a line to add
    """
    result_text.append(text)


def _get_result_doc() -> str:
    """Gets the document with results.

    Returns:
        str: the results document as text
    """
    return "".join(result_text)


def _read_from_file(file_path: Path):
    """
    Read a CSV file into a Dataframe.

    Args:
        file_path (Path): the path of the file to read
    """
    if not file_path.is_file():
        logger.error(
            f"- No score file exists at {file_path}. "
            "Please generate the score and try again."
        )
        sys.exit(1)
    return pd.read_csv(
        file_path,
        index_col="GEOID10_TRACT",
        dtype={"GEOID10_TRACT": str},
        low_memory=False,
    ).sort_index()


def _add_tract_list(tract_list: list[str]):
    """
    Adds a list of tracts to the output grouped by Census state.

    Args:
        tract_list (list[str]): a list of tracts
    """
    if len(tract_list) > 0:
        _add_text("Those tracts are:\n")
        # First extract the Census states/territories
        states_by_tract = []
        for tract in tract_list:
            states_by_tract.append(tract[0:2])
        states = set(states_by_tract)
        # Now output the grouped tracts
        for state in sorted(states):
            tracts_for_state = [
                item for item in tract_list if item.startswith(state)
            ]
            _add_text(
                f"\t{state} = {len(tracts_for_state)} = {', '.join(tracts_for_state)}\n"
            )


def _compare_score_columns(prod_df: pd.DataFrame, local_df: pd.DataFrame):
    """
    Compare the columns between scores.

    Args:
        prod_df (pd.DataFrame): the production score
        local_df (pd.DataFrame): the local score
    """
    log_info("Comparing columns (production vs local)")
    _add_text("## Columns\n")
    local_score_df_columns = sorted(local_df.columns.array.tolist())
    production_score_df_columns = sorted(prod_df.columns.array.tolist())
    extra_cols_in_local = set(local_score_df_columns) - set(
        production_score_df_columns
    )
    extra_cols_in_prod = set(production_score_df_columns) - set(
        local_score_df_columns
    )
    if len(extra_cols_in_local) == 0 and len(extra_cols_in_prod) == 0:
        _add_text("* There are no differences in the column names.\n")
    else:
        _add_text(
            f"* There are {len(extra_cols_in_local)} columns that were added as compared to the production score."
        )
        if len(extra_cols_in_local) > 0:
            _add_text(f" Those colums are:\n{extra_cols_in_local}")
        _add_text(
            f"\n* There are {len(extra_cols_in_prod)} columns that were removed as compared to the production score."
        )
        if len(extra_cols_in_prod) > 0:
            _add_text(f" Those colums are:\n{extra_cols_in_prod}")


def _compare_score_results(prod_df: pd.DataFrame, local_df: pd.DataFrame):
    """
    Compare the scores.

    Args:
        prod_df (pd.DataFrame): the production score
        local_df (pd.DataFrame): the local score
    """
    log_info("Comparing dataframe contents (production vs local)")
    _add_text("\n\n## Scores\n")

    production_row_count = len(prod_df.index)
    local_row_count = len(local_df.index)

    # Tract comparison
    _add_text(
        f"* The production score has {production_row_count:,} census tracts, and the freshly calculated score has {local_row_count:,}."
    )
    if production_row_count == local_row_count:
        _add_text(" They match!\n")
    else:
        _add_text(" They don't match. The differences are:\n")
        _add_text(
            "  * New tracts added to the local score are:\n"
            f"{local_df.index.difference(prod_df.index).to_list()}"
            "\n  * Tracts removed from the local score are:\n"
            f"{prod_df.index.difference(local_df.index).to_list()}"
            "\n"
        )

    # Population comparison
    production_total_population = prod_df[field_names.TOTAL_POP_FIELD].sum()
    local_total_population = local_df[field_names.TOTAL_POP_FIELD].sum()

    _add_text(
        f"* The total population in all census tracts in the production score is {production_total_population:,}. "
        f"The total population in all census tracts locally is {local_total_population:,}. "
    )
    _add_text(
        "They match!\n"
        if production_total_population == local_total_population
        else f"The difference is {abs(production_total_population - local_total_population):,}.\n"
    )

    dacs_query = f"`{field_names.FINAL_SCORE_N_BOOLEAN}` == True"
    production_disadvantaged_tracts_df = prod_df.query(dacs_query)
    local_disadvantaged_tracts_df = local_df.query(dacs_query)

    production_disadvantaged_tracts_set = set(
        production_disadvantaged_tracts_df.index.array
    )
    local_disadvantaged_tracts_set = set(
        local_disadvantaged_tracts_df.index.array
    )

    production_pct_of_population_represented = (
        production_disadvantaged_tracts_df[field_names.TOTAL_POP_FIELD].sum()
        / production_total_population
    )
    local_pct_of_population_represented = (
        local_disadvantaged_tracts_df[field_names.TOTAL_POP_FIELD].sum()
        / local_total_population
    )

    # DACS comparison
    _add_text(
        f"* There are {len(production_disadvantaged_tracts_set):,} disadvantaged tracts in the production score representing"
        f" {production_pct_of_population_represented:.1%} of the total population, and {len(local_disadvantaged_tracts_set):,}"
    )
    _add_text(
        f" in the locally generated score representing {local_pct_of_population_represented:.1%} of the total population."
    )
    _add_text(
        " The number of tracts match!\n "
        if len(production_disadvantaged_tracts_set)
        == len(local_disadvantaged_tracts_set)
        else f" The difference is {abs(len(production_disadvantaged_tracts_set) - len(local_disadvantaged_tracts_set))} tract(s).\n "
    )

    removed_tracts = production_disadvantaged_tracts_set.difference(
        local_disadvantaged_tracts_set
    )
    added_tracts = local_disadvantaged_tracts_set.difference(
        production_disadvantaged_tracts_set
    )
    _add_text(
        f"* There are {len(removed_tracts):,} tract(s) marked as disadvantaged in the production score that are not disadvantaged in the locally"
        f" generated score (i.e. disadvantaged tracts that were removed by the new score). "
    )
    _add_tract_list(removed_tracts)

    _add_text(
        f"\n* There are {len(added_tracts):,} tract(s) marked as disadvantaged in the locally generated score that are not disadvantaged in the"
        f" production score (i.e. disadvantaged tracts that were added by the new score). "
    )
    _add_tract_list(added_tracts)

    # Grandfathered tracts from v1.0
    grandfathered_tracts = local_df.loc[
        local_df[field_names.GRANDFATHERED_N_COMMUNITIES_V1_0]
    ].index
    if len(grandfathered_tracts) > 0:
        _add_text(
            f"* This includes {len(grandfathered_tracts)} grandfathered tract(s) from v1.0 scoring."
        )
        _add_tract_list(grandfathered_tracts)
    else:
        _add_text("* There are NO grandfathered tracts from v1.0 scoring.\n")


def _generate_delta(prod_df: pd.DataFrame, local_df: pd.DataFrame):
    """
    Generate a delta of scores

    Args:
        prod_df (pd.DataFrame): the production score
        local_df (pd.DataFrame): the local score
    """
    _add_text("\n## Delta\n")
    # First we make the columns on two dataframes to be the same to be able to compare
    local_score_df_columns = local_df.columns.array.tolist()
    production_score_df_columns = prod_df.columns.array.tolist()
    extra_cols_in_local = set(local_score_df_columns) - set(
        production_score_df_columns
    )
    extra_cols_in_prod = set(production_score_df_columns) - set(
        local_score_df_columns
    )
    trimmed_prod_df = prod_df.drop(extra_cols_in_prod, axis=1)
    trimmed_local_df = local_df.drop(extra_cols_in_local, axis=1)
    try:

        comparison_results_df = trimmed_prod_df.compare(
            trimmed_local_df, align_axis=1, keep_shape=False, keep_equal=False
        ).rename({"self": "Production", "other": "Local"}, axis=1, level=1)

        _add_text(
            "* I compared all values across all census tracts. Note this ignores any columns that have been added or removed."
            f" There are {len(comparison_results_df.index):,} tracts with at least one difference.\n"
        )

        comparison_path = WORKING_PATH / "deltas.csv"
        comparison_results_df.to_csv(path_or_buf=comparison_path)

        _add_text(f"* Wrote comparison results to {comparison_path}")

    except ValueError as e:
        _add_text(
            "* I could not run a full comparison. This is likely because there are column or index (census tract) differences."
            " Please examine the logs or run the score comparison locally to find out more.\n"
        )
        _add_text(
            f"Encountered an exception while performing the comparison: {repr(e)}\n"
        )


@click.group()
def cli():
    """
    A helper tool to run comparisons between files in production and those
    in the local file system.
    """


@cli.command(
    help="Compare score stored in the AWS production environment to the locally generated score. Defaults to checking against version 1.0.",
)
@click.option(
    "-v",
    "--compare-to-version",
    default="1.0",
    required=False,
    type=str,
    help="Set the production score version to compare to",
)
@click.option(
    "-f",
    "--compare_to_file",
    type=click.Path(exists=True, dir_okay=False, path_type=Path),
    help="Compare to the specified score CSV file instead of downloading from production",
)
@click.option(
    "-l",
    "--local_score_file",
    type=click.Path(exists=True, dir_okay=False, path_type=Path),
    default=constants.DATA_SCORE_CSV_FULL_FILE_PATH,
    help="Compare to the specified score CSV file instead of downloading from production",
)
def compare_score(
    compare_to_version: str, compare_to_file: str, local_score_file: str
):
    """Compares the score in the production environment to the locally generated score. The
    algorithm is pretty simple:

    1. Fetch and load both scores into dataframes.
    2. Round floats to a number of decimal places to account for differences in the machine
    and python versions used to generate the scores. If we skip this step, there are usually
    thousands of extremely minor differences.
    3. Compare the columns. Print out the deltas.
    4. Compare the values. Print out the deltas. Save the deltas to deltas.csv.
    5. Save a nice summary to comparison-summary.md. End.
    """

    FLOAT_ROUNDING_PLACES = 2

    log_title("Compare Score", "Compare production score to local score")

    if compare_to_file:
        log_info(f"Comparing to file {compare_to_file}...")
        production_score_path = compare_to_file
    else:
        # TODO: transition to downloader code when it's available
        production_score_url = f"https://justice40-data.s3.amazonaws.com/data-versions/{compare_to_version}/data/score/csv/full/usa.csv"
        production_score_path = WORKING_PATH / "usa.csv"

        log_info(f"Fetching score version {compare_to_version} from AWS")
        production_score_path.parent.mkdir(parents=True, exist_ok=True)
        download_file_from_url(
            file_url=production_score_url,
            download_file_name=production_score_path,
        )

    log_info(f"Loading local score from {local_score_file}")
    local_score_df = _read_from_file(local_score_file)
    log_info(f"Loading production score from {production_score_path}")
    production_score_df = _read_from_file(production_score_path)

    # Because of variations in Python versions and machine-level calculations, some of
    # our numbers can be really close but not the same. That throws off our comparisons.
    # So we're going to round to a reasonable amount of digits before doing anything else.

    production_score_df = production_score_df.round(FLOAT_ROUNDING_PLACES)
    local_score_df = local_score_df.round(FLOAT_ROUNDING_PLACES)

    _add_text("# Score Comparison Summary\n")
    _add_text(
        f"Hi! I'm the Score Comparator. I compared the score in production (version {compare_to_version}) to the"
        " locally calculated score. Here are the results:\n\n"
    )

    _compare_score_columns(production_score_df, local_score_df)
    _compare_score_results(production_score_df, local_score_df)
    _generate_delta(production_score_df, local_score_df)

    result_doc = _get_result_doc()
    print(result_doc)

    # Write the report
    summary_path = WORKING_PATH / "comparison-summary.md"
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write(result_doc)
        log_info(f"Wrote comparison summary to {summary_path}")

    log_goodbye()
    sys.exit()


if __name__ == "__main__":
    cli()
