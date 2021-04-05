/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import NavBar from 'components/NavBar';
import StringsPage from 'containers/StringsPage/Loadable';
import AddStringPage from 'containers/AddStringPage/Loadable';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 40px 0;
`;

export default function App() {
  return (
    <div>
      <NavBar />
      <AppWrapper>
        <Helmet
          titleTemplate="Strings App Take Home"
          defaultTitle="Strings App"
        >
          <meta name="description" content="A Strings app take home." />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/strings" component={StringsPage} />
          <Route exact path="/strings/add" component={AddStringPage} />
          <Redirect to="/" />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    </div>
  );
}
