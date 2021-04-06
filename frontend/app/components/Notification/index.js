/**
 *
 * Notification
 *
 */

import styled from 'styled-components';

const Notification = styled.h3`
  font-size: 30px;
  margin: 10px;
  background-color: ${props => (props.success ? '#70e000' : '#f94144')};
  opacity: 0.3;
  color: ${props => (props.success ? '#6c757d' : '#343a40')};
  padding: 10px 12px;
  border-radius: 5px;
`;

export default Notification;
