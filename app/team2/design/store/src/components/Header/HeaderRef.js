import { Check } from '@mui/icons-material';
import classes from './HeaderRef.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    Avatar,
    Badge,
    Breadcrumbs,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { userSelector, cartSelector } from '../../redux/selectors';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userSlice from '../../redux/userSlice';
import noticeSlice from '../../redux/noticeSlice';
import cartSlice from './cartSlice';

function Notification(props) {
    const { setOpenNotifications } = props;
    const notificationElement = useRef();
    useEffect(() => {
        const handleCloseNotification = (e) => {
            if (!notificationElement.current.contains(e.target)) {
                setOpenNotifications(false);
            }
        };

        window.addEventListener('click', handleCloseNotification);
        return () =>
            window.removeEventListener('click', handleCloseNotification);
    }, []);
    return (
        <div
            className={`${classes.noticeContainer} shadow-max`}
            ref={notificationElement}
        >
            <Paper sx={{ width: 350 }}>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper'
                    }}
                >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {
                                        " — I'll be in your neighborhood doing errands this…"
                                    }
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Travis Howard"
                                src="/static/images/avatar/2.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {
                                        " — Wish I could come, but I'm out of town this…"
                                    }
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Cindy Baker"
                                src="/static/images/avatar/3.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {
                                        ' — Do you have Paris recommendations? Have you ever…'
                                    }
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </Paper>
        </div>
    );
}

const pageName = {
    '/login': 'Đăng nhập',
    '/register': 'Đăng kí',
    '/': 'Trang chủ'
};

function HeaderRef(props) {
    const {
        duplicate,
        duplicated,
        isBase,
        headerElement,
        position,
        openNotifications,
        setOpenNotifications
    } = props;

    const user = useSelector(userSelector);
    const cart = useSelector(cartSelector);
    const userInfo = user.current;
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleLogout = () => {
        dispatch(userSlice.actions.logout());
        dispatch(
            noticeSlice.actions.show({
                title: 'Đăng xuất thành công',
                type: 'success'
            })
        );
    };
    const handleOpenCart = () => {
        dispatch(cartSlice.actions.show());
    };
    return (
        <section
            className={classes.mainContainer}
            style={
                duplicate
                    ? {
                          position: 'fixed',
                          top: position.top + 'px',
                          right: position.top.right + 'px',
                          width: position.width
                              ? position.width + 'px'
                              : '100%',
                          backgroundColor: 'var(--bg-white-transparent)',
                          zIndex: 100,
                          border: '2px solid var(--bg-primary)'
                      }
                    : {}
            }
            className={`${classes.root} ${
                isBase ? (duplicated ? 'disapear' : '') : 'shadow-short'
            }`}
        >
            <div className={classes.secondaryContainer} ref={headerElement}>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <div className={classes.coverLink}>
                            <Link to="/">
                                <HomeIcon fontSize="small" />
                            </Link>
                        </div>
                        <Typography color="text.primary">
                            {pageName[pathname] || 'Xem sản phẩm'}
                        </Typography>
                    </Breadcrumbs>
                    <div className={classes.pageName}>
                        {pageName[pathname] || 'Xem sản phẩm'}
                    </div>
                </div>
                <div className={classes.rightGroup}>
                    <TextField
                        id="outlined-basic"
                        label="Tìm kiếm"
                        variant="outlined"
                        size="small"
                    />

                    <div className={classes.iconContainer}>
                        {userInfo ? (
                            <>
                                <Link to={'/personal'}>
                                    <IconButton aria-label="Avatar">
                                        <Avatar
                                            sx={{ bgcolor: 'success' }}
                                            alt={userInfo.displayName}
                                            src={
                                                process.env.REACT_APP_API_URL +
                                                userInfo.avatar
                                            }
                                            style={{
                                                border: '2px solid var(--bg-primary)'
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                                <Badge
                                    badgeContent={4}
                                    color="primary"
                                    variant="dot"
                                    style={{ position: 'relative' }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                >
                                    <Button
                                        startIcon={<NotificationsActiveIcon />}
                                        sx={{ p: 0.3, textTransform: 'none' }}
                                        onClick={() =>
                                            setOpenNotifications(true)
                                        }
                                    >
                                        Thông báo
                                    </Button>
                                    {openNotifications &&
                                        ((isBase && !duplicated) ||
                                            !isBase) && (
                                            <Notification
                                                setOpenNotifications={
                                                    setOpenNotifications
                                                }
                                            />
                                        )}
                                </Badge>
                                <Badge
                                    badgeContent={cart.current?.quantity}
                                    color="primary"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                >
                                    <Button
                                        startIcon={<ShoppingCartIcon />}
                                        sx={{ p: 0.3, textTransform: 'none' }}
                                        onClick={handleOpenCart}
                                    >
                                        Giỏ hàng
                                    </Button>
                                </Badge>

                                <Button
                                    sx={{ textTransform: 'none' }}
                                    style={{ marginLeft: '0!important' }}
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/register">
                                    <Button
                                        startIcon={<AppRegistrationIcon />}
                                        sx={{
                                            py: 0.3,
                                            px: 1,
                                            textTransform: 'none',
                                            color:
                                                pathname === '/register'
                                                    ? 'white !important'
                                                    : ''
                                        }}
                                        variant={
                                            pathname === '/register'
                                                ? 'contained'
                                                : ''
                                        }
                                    >
                                        Đăng kí
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button
                                        startIcon={<LoginIcon />}
                                        sx={{
                                            py: 0.3,
                                            px: 1,
                                            textTransform: 'none',
                                            color:
                                                pathname === '/login'
                                                    ? 'white !important'
                                                    : ''
                                        }}
                                        variant={
                                            pathname === '/login'
                                                ? 'contained'
                                                : ''
                                        }
                                    >
                                        Đăng nhập
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeaderRef;
