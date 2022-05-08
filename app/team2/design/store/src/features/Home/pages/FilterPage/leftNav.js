import React from 'react';
import classes from './leftNav.module.scss';
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
    ListSubheader
} from '@mui/material';
import { ExpandLess, StarBorder, ExpandMore } from '@mui/icons-material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import BusinessIcon from '@mui/icons-material/Business';

function LeftNav(props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={classes.fixedFullHeightContainer}>
            <div className={`${classes.leftNavContainerMain} shadow-linear`}>
                <div className={classes.leftNavContainer}>
                    <List
                        sx={{ width: '100%' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'white'
                                }}
                            >
                                <FilterAltIcon />
                                <h2 className={classes.navHeader}>
                                    Lọc sản phẩm
                                </h2>
                            </ListSubheader>
                        }
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Checkbox
                                    color="primary"
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Giảm giá" />
                        </ListItemButton>
                        <ListItemButton selected>
                            <ListItemIcon>
                                <Checkbox
                                    color="primary"
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Giao hàng nhanh" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nhà phát hành" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <Checkbox
                                            color="primary"
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Nhà sách Phương Nam" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </div>
                <div className={`${classes.subNavFooter} shadow-linear`}>
                    <Button
                        variant="contained"
                        startIcon={<FilterAltOffIcon />}
                        style={{ borderRadius: '0.75rem' }}
                    >
                        Huỷ tất cả bộ lọc
                    </Button>
                </div>
            </div>
        </div>
    );
}

LeftNav.propTypes = {};

export default LeftNav;
