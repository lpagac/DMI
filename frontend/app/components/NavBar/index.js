/**
 *
 * NavBar
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import StyledNavLink from './StyledNavLink';
import messages from './messages';

function NavBar() {
  const activeStyle = {
    backgroundColor: '#7209b7',
  };
  return (
    <Wrapper>
      <div>
        <StyledNavLink exact to="/strings" activeStyle={activeStyle}>
          <FormattedMessage {...messages.allStrings} />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink exact to="/" activeStyle={activeStyle}>
          <FormattedMessage {...messages.home} />
        </StyledNavLink>
      </div>
      <div>
        <StyledNavLink exact to="/strings/add" activeStyle={activeStyle}>
          <FormattedMessage {...messages.addString} />
        </StyledNavLink>
      </div>
    </Wrapper>
  );
}

export default NavBar;
