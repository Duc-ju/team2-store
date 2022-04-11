import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';

const FooterComponent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  background-color: #fff;
  padding: 8px 32px;
  justify-content: space-between;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
`;

const FooterRight = styled.div`
  > * {
    margin-left: 16px;
  }
`;
function Footer() {
  return (
    <FooterComponent>
      <FooterLeft>
        <p style={{ marginRight: '4px' }}>©2022 make with</p>
        <FavoriteIcon color='error' />
        <p style={{ marginLeft: '4px' }}>by Duc Ju</p>
      </FooterLeft>
      <FooterRight>
        <a>About Me</a>
        <a>Contact</a>
        <a>Blog</a>
      </FooterRight>
    </FooterComponent>
  );
}

export default Footer;
