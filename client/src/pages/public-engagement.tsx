import {useIntl} from 'gatsby-plugin-intl';
import * as React from 'react';
import {useEffect} from 'react';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import {PAGES_ENDPOINTS} from '../data/constants';
import * as PUBLIC_ENG_COPY from '../data/copy/publicEngage';

interface IPublicEngagementPageProps {
  location: Location;
}

const PublicEngagementPage = ({location}: IPublicEngagementPageProps) => {
  const intl = useIntl();

  // Gatsby does not support redirection for AWS S3, so we do it here.
  useEffect(() => {
    // Gatsby does not support window during the build, so we check first before we use it.
    const isInBrowser = () => typeof window !== undefined;
    if (isInBrowser()) {
      const targetUrl = window.location.pathname.replace(PAGES_ENDPOINTS.PUBLIC_ENG, PAGES_ENDPOINTS.PREVIOUS_VERSIONS);
      setTimeout(() => {
        window.location.replace(targetUrl);
      }, 5000);
    }
  }, []);

  return (
    <Layout location={location} title={intl.formatMessage(PUBLIC_ENG_COPY.PAGE_TITLE.REDIRECT_TITLE)}>
      <J40MainGridContainer>
        <div>
          {PUBLIC_ENG_COPY.REDIRECT_TEXT}
        </div>
      </J40MainGridContainer>
    </Layout>
  );
};

export default PublicEngagementPage;
