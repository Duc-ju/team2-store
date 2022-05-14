import React from 'react';
import classes from './leftNav.module.scss';
import {
    Button,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LeftNav(props) {
    const location = useLocation();
    const selectedIndex = (() => {
        if (location.pathname.includes('/personal/orders')) return 1;
        return 0;
    })();
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
                                <PersonPinIcon />
                                <h2 className={classes.navHeader}>Cá nhân</h2>
                            </ListSubheader>
                        }
                    >
                        <ListItemButton selected={selectedIndex === 0}>
                            <Link to={'/personal'}>
                                <ListItemText primary="Thông tin cá nhân" />
                            </Link>
                        </ListItemButton>
                        <ListItemButton selected={selectedIndex === 1}>
                            <Link to={'/personal/orders'}>
                                <ListItemText primary="Đơn hàng" />
                            </Link>
                        </ListItemButton>
                    </List>
                </div>
                <div className={`${classes.subNavFooter} shadow-linear`}>
                    <Button
                        variant="contained"
                        startIcon={<LogoutIcon />}
                        style={{ borderRadius: '0.75rem' }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </div>
    );
}

LeftNav.propTypes = {};

export default LeftNav;
