import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default styled(NavLink)`
  font-size: 1.6rem;
  margin: 0 2rem;
  padding: 5px 5px;
  user-select: none;
  text-decoration: none;
  color: #fff;
  background-color: #bdb2ff;
  border-radius: 4px;

  &:hover {
    background-color: #7209b7;
  }
`;
