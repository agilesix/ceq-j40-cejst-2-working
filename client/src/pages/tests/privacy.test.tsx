import {render} from '@testing-library/react';
import * as React from 'react';
import {LocalizedComponent} from '../../test/testHelpers';
import Privacy from '../privacy';

describe('rendering of the Privacy Policy page', () => {
  const {asFragment} = render(
      <LocalizedComponent>
        <Privacy location={window.location}/>
      </LocalizedComponent>,
  );

  it('matches Privacy Policy page snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
