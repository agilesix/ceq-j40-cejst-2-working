import {useIntl} from 'gatsby-plugin-intl';
import * as React from 'react';

import {Grid} from '@trussworks/react-uswds';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import * as PRIVACY_COPY from '../data/copy/privacy';

interface IPrivacyPageProps {
  location: Location;
}

const PrivacyPage = ({location}: IPrivacyPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(PRIVACY_COPY.PAGE_INTRO.PAGE_TITLE)}>
      <J40MainGridContainer>
        <section className={'page-heading'}>
          <h1>{intl.formatMessage(PRIVACY_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>
        </section>

        <Grid row gap className={'j40-mb5-mt3'}>
          <Grid desktop={{col: 8}}>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.EFFECTIVE_DATE}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.INTRO}</p>

            <h2 id="info-collect">{PRIVACY_COPY.PRIVACY_CONTENT.INFO_COLLECT_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.INFO_COLLECT_BODY}</p>

            <h2 id="personal-info">{PRIVACY_COPY.PRIVACY_CONTENT.PERSONAL_INFO_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.PERSONAL_INFO_BODY1}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.PERSONAL_INFO_BODY2}</p>

            <h2 id="use-info">{PRIVACY_COPY.PRIVACY_CONTENT.USE_INFO_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.USE_INFO_BODY1}</p>
            <ul>
              {PRIVACY_COPY.PRIVACY_CONTENT.USE_INFO_LIST.map((item, i) => (
                <li key={i}><p>{item}</p></li>
              ))}
            </ul>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.SHARING_INFO_BODY1}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.SHARING_INFO_BODY2}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.SHARING_INFO_BODY3}</p>

            <h2 id="cookies">{PRIVACY_COPY.PRIVACY_CONTENT.COOKIES_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.COOKIES_BODY1}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.COOKIES_BODY2}</p>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.COOKIES_BODY3}</p>

            <h2 id="external-links">{PRIVACY_COPY.PRIVACY_CONTENT.EXTERNAL_LINKS_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.EXTERNAL_LINKS_BODY}</p>

            <h2 id="children">{PRIVACY_COPY.PRIVACY_CONTENT.CHILDREN_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.CHILDREN_BODY}</p>

            <h2 id="security">{PRIVACY_COPY.PRIVACY_CONTENT.SECURITY_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.SECURITY_BODY}</p>

            <h2 id="contact">{PRIVACY_COPY.PRIVACY_CONTENT.CONTACT_HEADING}</h2>
            <p>{PRIVACY_COPY.PRIVACY_CONTENT.CONTACT_BODY}</p>
          </Grid></Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default PrivacyPage;
