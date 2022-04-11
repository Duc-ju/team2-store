import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../components/Container';
import {
  Button,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { ExpandLess, StarBorder, ExpandMore } from '@mui/icons-material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import BusinessIcon from '@mui/icons-material/Business';

const FixedFullHeightContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  max-width: inherit;
  height: calc(100vh - 32px);
  overflowy: scroll;
`;
const SubNavFooter = styled.div`
  border-radius: 0 0 0.75rem 0.75rem;
  background-color: white;
  position: absolute;
  bottom: -32px;
  left: 0;
  right: 0;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;
const LeftNavContainerMain = styled.div`
  background-color: white;
  height: 100%;
  margin: 16px;
  border-radius: 0.75rem;
`;
const LeftNavContainer = styled(Container)`
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ::after {
    content: '';
    display: block;
    height: 68px;
  }
`;

const NavHeader = styled.h2`
  font-size: 20px;
  line-height: 1.5;
  margin-left: 8px;
`;
function LeftNav(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <FixedFullHeightContainer>
      <LeftNavContainerMain className='shadow-linear'>
        <LeftNavContainer>
          <List
            sx={{ width: '100%' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'white',
                }}
              >
                <FilterAltIcon />
                <NavHeader>Lọc sản phẩm</NavHeader>
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <Checkbox
                  color='primary'
                  edge='start'
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary='Giảm giá' />
            </ListItemButton>
            <ListItemButton selected>
              <ListItemIcon>
                <Checkbox
                  color='primary'
                  edge='start'
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary='Giao hàng nhanh' />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary='Nhà phát hành' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      color='primary'
                      edge='start'
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary='Nhà sách Phương Nam' />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </LeftNavContainer>
        <SubNavFooter className='shadow-linear'>
          <Button
            variant='contained'
            startIcon={<FilterAltOffIcon />}
            style={{ borderRadius: '0.75rem' }}
          >
            Huỷ tất cả bộ lọc
          </Button>
        </SubNavFooter>
      </LeftNavContainerMain>
    </FixedFullHeightContainer>
  );
}

LeftNav.propTypes = {};

export default LeftNav;
