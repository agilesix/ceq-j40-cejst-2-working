/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
import * as COMMON_COPY from './common';
import {VERSION_NUMBER} from './methodology';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'downloads.page.title.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the Downloads page, this will be the page title text',
  },
  PAGE_HEADING1: {
    id: 'downloads.page.heading1.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the Downloads page, this will be the page heading1 text',
  },
  VIEW: {
    id: 'downloads.page.view.text',
    defaultMessage: 'View',
    description: 'Navigate to the Downloads page, this will be the view of change log',
  },
  CHANGE_LOG: {
    id: 'downloads.page.change.log.text',
    defaultMessage: 'release notes',
    description: 'Navigate to the Downloads page, this will be the view of release notes',
  },
});

export const getDownloadFileUrl = (filePath: string | undefined, isBeta: boolean) => {
  return [
    process.env.GATSBY_CDN_TILES_BASE_URL,
    (isBeta ? process.env.GATSBY_BETA_SCORE_PATH : process.env.GATSBY_2_0_SCORE_PATH),
    filePath,
  ].join('/');
};

// Define meta data on dowload files
export const DOWNLOAD_FILES = {
  NARWAL: {
    COMMUNITIES_LIST_XLS: {
      SIZE: 35.6, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_COMMUNITIES_LIST_XLS, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    COMMUNITIES_LIST_CSV: {
      SIZE: 42, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_COMMUNITIES_LIST_CSV, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    SHAPE_FILE: {
      SIZE: 356.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_SHAPE_FILE_ZIP, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    TSD: {
      SIZE: 4.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_TSD_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    TSD_ES: {
      SIZE: 4.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_ES_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    HOW_TO_COMMUNITIES: {
      SIZE: 687.9, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_COMMUNITIES_LIST_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    HOW_TO_COMMUNITIES_ES: {
      SIZE: 761.8, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_COMMUNITIES_LIST_ES_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    INSTRUCTIONS: {
      SIZE: 228.4, // KB // Todo: Update when actual file is uploaded
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_INSTRUCT_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    INSTRUCTIONS_ES: {
      SIZE: 173.6, // KB // Todo: Update when actual file is uploaded
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_INSTRUCT_ES_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    COMP_CHART: {
      SIZE: 33.1, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_TOOL_COMP_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
    M_23_09_ES: {
      SIZE: 120.5, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_2_0_M_23_09_SIGNED_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_2_0_RELEASE_DATE,
    },
  },
  BETA: {
    COMMUNITIES_LIST_XLS: {
      SIZE: 23.7, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_COMMUNITIES_LIST_XLS, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    COMMUNITIES_LIST_CSV: {
      SIZE: 26.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_COMMUNITIES_LIST_CSV, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    SHAPE_FILE: {
      SIZE: 351.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_SHAPE_FILE_ZIP, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    TSD: {
      SIZE: 2.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    TSD_ES: {
      SIZE: 4.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_ES_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    HOW_TO_COMMUNITIES: {
      SIZE: 658.3, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_HOW_TO_COMMUNITIES_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
  },
};

// If this is not a function, it will cause a circular dependency
export const getDownloadIconAltTag = () => defineMessages({
  ALT_TAG: {
    id: 'downloads.page.download.icon.alt.tag',
    defaultMessage: 'The icon used to indicate that the file is downloadable',
    description: 'Navigate to the Downloads page, this is the icon used to indicate that the file is downloadable',
  },
});

export const RELEASE_2_0 = {
  HEADER: <FormattedMessage
    id={'download.page.release.2_0.update.HEADER'}
    defaultMessage={`Version {release} Release update - {date}`}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      release: VERSION_NUMBER,
      date: <FormattedDate
        value={COMMON_COPY.METH_2_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
  NEW_IMPROVED_SECTION: <FormattedMessage
    id={'download.page.release.2_0.update.NEW_IMPROVED_SECTION'}
    defaultMessage={`New & improved`}
    description={'Navigate to the download page. This is new and improved section'}
  />,
  SCORING_SUBSECTION: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_SUBSECTION'}
    defaultMessage={`Scoring improvements`}
    description={'Navigate to the download page. This is scorig improvement section'}
  />,
  SCORING_CONTENT_1: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_1'}
    defaultMessage={`Updated to use Census Decennial 2020 data for the U.S. territories 
      of Guam, Virgin Islands, Northern Mariana Islands, and American Samoa`}
    description={'Navigate to the download page. This is release content'}
  />,
  SCORING_CONTENT_2: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_2'}
    defaultMessage={`U.S. territories of Guam, Virgin Islands, Northern Mariana Islands, 
      and American Samoa qualify as disadvantaged communities based on a low-income 
      threshold at or above the 65th percentile, in addition to any existing qualification 
      pathways`}
    description={'Navigate to the download page. This is release content'}
  />,
  SCORING_CONTENT_3: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_3'}
    defaultMessage={`Apply a donut hole disadvantaged community qualification to U.S. 
      territories of Guam, Virgin Islands, Northern Mariana Islands, American Samoa, 
      and Puerto Rico based on adjacency to already qualifying disadvantaged community 
      tracts and meeting a 50th percentile low-income threshold`}
    description={'Navigate to the download page. This is release content'}
  />,
  SCORING_CONTENT_4: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_4'}
    defaultMessage={`Improved donut hole disadvantaged community qualification by 
      adding tracts that are fully surrounded and have water boundaries`}
    description={'Navigate to the download page. This is release content'}
  />,
  SCORING_CONTENT_5: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_5'}
    defaultMessage={`The poverty percentage calculation excludes college students, 
      ensuring it reflects the economic conditions of the non-college population`}
    description={'Navigate to the download page. This is release content'}
  />,
  SCORING_CONTENT_6: <FormattedMessage
    id={'download.page.release.2_0.update.SCORING_CONTENT_6'}
    defaultMessage={`Grandfathering of Census tracts that were designated as 
      disadvantaged communities in version 1.0 of this tool`}
    description={'Navigate to the download page. This is release content'}
  />,
  UI_SUBSECTION: <FormattedMessage
    id={'download.page.release.2_0.update.UI_SUBSECTION'}
    defaultMessage={`User interface improvements`}
    description={'Navigate to the download page. This is the UI improvements section'}
  />,
  UI_CONTENT_1: <FormattedMessage
    id={'download.page.release.2_0.update.UI_CONTENT_1'}
    defaultMessage={`Users can now search on the map by Census tract ID`}
    description={'Navigate to the download page. This is release content'}
  />,
  UI_CONTENT_2: <FormattedMessage
    id={'download.page.release.2_0.update.UI_CONTENT_2'}
    defaultMessage={`Show island and territory low-income percentiles in the sidebar`}
    description={'Navigate to the download page. This is release content'}
  />,
};

export const DOWNLOAD_LINKS = {
  TITLE: <FormattedMessage
    id={'download.page.files.section.title'}
    defaultMessage={`Version {version} file formats`}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
  TEXT: <FormattedMessage
    id={'downloads.page.files.section.text'}
    defaultMessage={'The dataset used in the {version} version of the tool, along with a codebook, and information about how to use the list of communities (.pdf) are available for download:'}
    description={'Navigate to the Downloads page, this will be the page description1 text'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
  LINK1: <FormattedMessage
    id={'download.page.download.file.1'}
    defaultMessage={`
      <link1>Communities list data</link1> (.xlsx {cldXlsFileSize})
      `}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      link1: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_XLS.URL),
      cldXlsFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_XLS.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK2: <FormattedMessage
    id={'download.page.download.file.2'}
    defaultMessage={`<link2>Communities list data</link2> (.csv {cldCsvFileSize})`}
    description={'Navigate to the download page. This is second download file link'}
    values={{
      link2: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_CSV.URL),
      cldCsvFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_CSV.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK3: <FormattedMessage
    id={'download.page.download.file.3'}
    defaultMessage={`<link3>Shapefile</link3> (Codebook included with shapefile {shapeFileSize} unzipped)`}
    description={'Navigate to the download page. This is third download file link'}
    values={{
      link3: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.SHAPE_FILE.URL),
      shapeFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.SHAPE_FILE.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK4: <FormattedMessage
    id={'download.page.download.file.4'}
    defaultMessage={`<link4>Technical support document</link4> (.pdf {tsdFileSize})`}
    description={'Navigate to the download page. This is fourth download file link'}
    values={{
      link4: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.TSD.URL, false, true),
      link4es: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.TSD_ES.URL, false, true),
      tsdFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.TSD.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK5: <FormattedMessage
    id={'download.page.download.file.5'}
    defaultMessage={`<link5>How to use the list of communities</link5> (.pdf {howToCommFileSize})`}
    description={'Navigate to the download page. This is fifth download file link'}
    values={{
      link5: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES.URL, false, true),
      link5es: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES_ES.URL, false, true),
      howToCommFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
      howToCommFileSizeEs: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES_ES.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK6: <FormattedMessage
    id={'download.page.download.file.6'}
    defaultMessage={`<link6>Instructions to Federal agencies on using the CEJST</link6> (.pdf {instructions})`}
    description={'Navigate to the download page. This is sixth download file link'}
    values={{
      link6: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.INSTRUCTIONS.URL, false, true),
      link6es: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.INSTRUCTIONS_ES.URL, false, true),
      instructions: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.INSTRUCTIONS.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
      instructionsEs: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.INSTRUCTIONS_ES.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  // };
};
