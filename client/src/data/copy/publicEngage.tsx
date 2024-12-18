/* eslint-disable max-len */
import React from 'react';
import {FormattedMessage, defineMessages} from 'gatsby-plugin-intl';
import {PAGES_ENDPOINTS} from '../constants';
import {linkFn} from './common';

export const PAGE_TITLE = defineMessages({
  REDIRECT_TITLE: {
    id: 'public.eng.page.redirect.title',
    defaultMessage: 'Public engagement',
    description: 'Navigate to the public engagement page. This is the redirect title.',
  },
});

export const REDIRECT_TEXT =
<FormattedMessage
  id={'public.eng.page.redirect.text'}
  defaultMessage={'The public engagement content has moved to the <link1>Previous Version</link1> page. <link1>Click here</link1> if you are not redirected after 5 seconds.'}
  description={`Navigate to the public engagement page. This is the redirect message.`}
  values={{
    link1: linkFn(PAGES_ENDPOINTS.PREVIOUS_VERSIONS, true, false),
  }}
/>;
