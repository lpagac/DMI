import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default styled(NavLink)`
  font-size: 25px;
  margin: 0 40px;
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
