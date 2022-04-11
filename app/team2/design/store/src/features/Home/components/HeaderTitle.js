import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from './Container';

export const HeaderContainer = styled(Container)`
  border-radius: 0.75rem 0.75rem 0 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 2px solid var(--bg-primary);
`;
const Title = styled.p`
  line-height: 1.5;
  margin: 0;
  margin-left: 8px;
`;
function HeaderTitle(props) {
  const { Icon, title, style, color } = props;
  return (
    <HeaderContainer style={style}>
      {Icon !== undefined && <Icon color={color} />}
      <Title>{title}</Title>
    </HeaderContainer>
  );
}

HeaderTitle.propTypes = {
  Icon: PropTypes.any,
  title: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
};

export default HeaderTitle;
