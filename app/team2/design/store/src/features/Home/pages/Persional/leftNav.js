import React from 'react';
import classes from './leftNav.module.scss';
import {
    Button,
    Checkbox,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';

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
                                <PersonPinIcon />
                                <h2 className={classes.navHeader}>Cá nhân</h2>
                            </ListSubheader>
                        }
                    >
                        <ListItemButton selected>
                            <ListItemText primary="Thông tin cá nhân" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary="Đơn hàng" />
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
