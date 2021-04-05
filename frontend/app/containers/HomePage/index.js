/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import H1 from 'components/H1';
import H3 from 'components/H3';
import messages from './messages';

const Wrapper = styled.div`
  text-align: center;
  text-transform: capitalize;
  margin-top: 60px;
`;

export default function HomePage() {
  return (
    <Wrapper>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Strings app Home Page" />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <H3>
        <FormattedMessage {...messages.subHeader} />
      </H3>
    </Wrapper>
  );
}
