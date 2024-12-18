import React from 'react';
import {FormattedDate, FormattedMessage, defineMessages} from 'gatsby-plugin-intl';
import {METH_1_0_RELEASE_DATE, METH_2_0_RELEASE_DATE, METH_BETA_RELEASE_DATE} from './common';

export const PAGE = defineMessages({
  TITLE: {
    id: 'previous.versions.page.title.text',
    defaultMessage: 'Previous versions',
    description: 'Navigate to the previous version page. This is the page title text',
  },
});

export const CARD = {
  TITLE: <FormattedMessage
    id={'previous.versions.page.card.text'}
    defaultMessage={'Beta version'}
    description={'Navigate to the previous version page. This is the Cards title text'}
  />,
  BODY: <FormattedMessage
    id={'previous.versions.page.body.text'}
    defaultMessage={`The beta version of the methodology and data was used during the public
      beta period to get feedback on the tool from {startDate} \u2013 {endDate}.`}
    description={'Navigate to the previous version page. This is the Cards body text'}
    values={{
      startDate: <FormattedDate
        value={METH_BETA_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
      endDate: <FormattedDate
        value={METH_1_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
};

export const CARD_1_0 = {
  TITLE: <FormattedMessage
    id={'previous.versions.page.card.text'}
    defaultMessage={'Version 1.0'}
    description={'Navigate to the previous version page. This is the Version 1.0 Card title text'}
  />,
  BODY: <FormattedMessage
    id={'previous.versions.page.body.text'}
    defaultMessage={`The 1.0 versions of the methodology and data were available on the tool\u2019s
website from {startDate} \u2013 {endDate}.`}
    description={'Navigate to the previous version page. This is the Version 1.0 Card body text'}
    values={{
      startDate: <FormattedDate
        value={METH_2_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
      endDate: <FormattedDate
        value={METH_2_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
};

export const BUTTON = defineMessages({
  TITLE1: {
    id: 'previous.versions.page.button1.text',
    defaultMessage: 'Data & documentation',
    description: 'Navigate to the previous version page. This is the Cards button1 text',
  },
  TITLE2: {
    id: 'previous.versions.page.button2.text',
    defaultMessage: 'Shapefile & codebook',
    description: 'Navigate to the previous version page. This is the Cards button2 text',
  },
  BUTTON1_ALT_TAG: {
    id: 'previous.versions.page.button1.alt.tag.text',
    defaultMessage: 'a button that allows to download the data and documentation to the tool',
    description: 'Navigate to the previous version page. This is the Cards button1.alt.tag text',
  },
  BUTTON2_ALT_TAG: {
    id: 'previous.versions.page.button2.alt.tag.text',
    defaultMessage: 'a button that allows to download the shapefile and codebook to the tool',
    description: 'Navigate to the previous version page. This is the Cards button2.alt.tag text',
  },

});

export const VIDEO = defineMessages({
  BUTTON1_BETA_TEXT: {
    id: 'public.eng.page.video.box.button1.beta.text',
    defaultMessage: `Watch on beta demo`,
    description: 'Navigate to the previous version page. This is that box button text.',
  },
  BUTTON1_1_0_TEXT: {
    id: 'public.eng.page.video.box.button1.1_0.text',
    defaultMessage: `Watch v1.0 demo`,
    description: 'Navigate to the previous version page. This is that box button text.',
  },
  IMG_ALT_TEXT1: {
    id: 'public.eng.page.video.box.button.img.alt.text1',
    defaultMessage: `the icon to show that this button will open in a new tab`,
    description: 'Navigate to the previous version page. This is alt tag of the image in the button.',
  },
  BUTTON2_TEXT: {
    id: 'public.eng.page.video.box.button2.text',
    defaultMessage: `Download slide deck`,
    description: 'Navigate to the previous version page. This is the button text for the second button.',
  },
  BUTTON2_BETA_TEXT: {
    id: 'public.eng.page.video.box.button2.beta.text',
    defaultMessage: `Download beta slide deck`,
    description: 'Navigate to the previous version page. This is the button text for the second button.',
  },
  IMG_ALT_TEXT2: {
    id: 'public.eng.page.video.box.button.img.alt.text2',
    defaultMessage: `the icon to show that this button will download the file`,
    description: 'Navigate to the previous version page. This is alt tag of the image in the 2nd button.',
  },
});
