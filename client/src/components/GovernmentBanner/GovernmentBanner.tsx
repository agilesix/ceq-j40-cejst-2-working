import {GovBanner} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import React from 'react';


import Language from '../Language';
import * as styles from './GovernmentBanner.module.scss';

const GovernmentBanner = () => {
  const intl = useIntl();

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.bannerContainer}>
        <GovBanner language={intl.locale === 'es' ? 'spanish' : 'english'}/>
        <Language isDesktop={true} />
      </div>
    </div>
  );
};

export default GovernmentBanner;
