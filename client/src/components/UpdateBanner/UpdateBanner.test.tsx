import {render} from '@testing-library/react';
import * as React from 'react';
import {LocalizedComponent} from '../../test/testHelpers';
import UpdateBanner, {cutoffDate} from './UpdateBanner';

describe('rendering of the UpdateBanner', () => {
  const renderBanner = (mockCurrentDate: Date) => {
    // make this testable at different dates so we can check large/small versions
    jest.useFakeTimers()
        .setSystemTime(mockCurrentDate);

    const result = render(
        <LocalizedComponent>
          <UpdateBanner />
        </LocalizedComponent>,
    ).asFragment();

    jest.useRealTimers();
    return result;
  };

  it('renders large version before cutoff date', () => {
    const beforeCutoff = new Date(cutoffDate);
    beforeCutoff.setDate(beforeCutoff.getDate() - 7);
    expect(renderBanner(beforeCutoff)).toMatchSnapshot();
  });

  it('renders small version at cutoff date', () => {
    expect(renderBanner(cutoffDate)).toMatchSnapshot();
  });
});
