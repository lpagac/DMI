/**
 *
 * Tests for StringsSection
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import StringsSection from '../index';
import messages from '../messages';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<StringsSection />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should display current strings', () => {
    const utils = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection
          loading={false}
          error={false}
          strings={[{ id: 'test-id', string: 'test string' }]}
        />
      </IntlProvider>,
    );

    const stringsSection = utils.getByText('test string');
    expect(stringsSection).not.toEqual(null);
  });

  it('should display error message if error is true', () => {
    const utils = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection loading={false} error strings={false} />
      </IntlProvider>,
    );

    const errorSection = utils.getByText(messages.error.defaultMessage);
    expect(errorSection).not.toEqual(null);
  });

  it('should display loading indicator if loading is true', () => {
    const utils = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection loading error={false} strings={false} />
      </IntlProvider>,
    );

    const loadingSection = utils.queryByTestId('loading-indicator');
    expect(loadingSection).not.toEqual(null);
  });

  it('should display nothing if unable to map over strings', () => {
    const utils = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <StringsSection loading={false} error={false} strings="not an array" />
      </IntlProvider>,
    );

    const stringsSection = utils.queryByText('not an array');
    expect(stringsSection).toEqual(null);
  });
});
