import {useIntl} from 'gatsby-plugin-intl';
import React from 'react';

import {IndicatorValue, IndicatorValueSubText} from '../Indicator/Indicator';

import * as styles from './IslandCopy.module.scss';

import * as EXPLORE_COPY from '../../data/copy/explore';

export interface IIslandCopyProps {
  povertyPercentile: number | null
}

const IslandCopy = ({povertyPercentile}: IIslandCopyProps) => {
  const intl = useIntl();
  const percentileWhole = povertyPercentile ?
    parseFloat((povertyPercentile*100).toFixed()) : null;
  const threshold = 65;

  return (
    <div className={styles.islandCopyContainer}>
      <div className={styles.islandRow}>
        <div className={styles.islandRowLabel}>
          {intl.formatMessage(EXPLORE_COPY.ISLAND_COPY.LOW_INC)}
        </div>
        <div className={styles.valueSubTextContainer}>
          <div className={`${styles.valueContainer}
            ${ percentileWhole && percentileWhole >= threshold ?
              styles.invert :
              styles.noInvert }
          `}>
            <IndicatorValue
              type={'percentile'}
              displayStat={percentileWhole}
            />
          </div>
          <div className={styles.subTextContainer}>
            <IndicatorValueSubText
              value={percentileWhole}
              isAboveThresh={percentileWhole && percentileWhole >= threshold ? true : false}
              threshold={threshold}
              type={'percentile'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslandCopy;
