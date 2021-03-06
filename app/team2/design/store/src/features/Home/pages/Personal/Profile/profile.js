import React, { useEffect } from 'react';
import classes from './profile.module.scss';
import PropTypes from 'prop-types';
import {
    Avatar,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import ChangePasswordModal from './changePasswordModal';
import ChangeInfoModal from './changeInfoModal';
import ChangeAvatarModal from './changeAvatarModal';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../redux/selectors';

const genders = {
    male: 'Nam',
    female: 'Nữ'
};

function Profile(props) {
    const user = useSelector(userSelector).current;

    const [openPasswordModal, setOpenPasswordModal] = React.useState(false);
    const [openInfoModal, setOpenInfoModal] = React.useState(false);
    const [openAvatarModal, setOpenAvatarModal] = React.useState(false);
    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);

    const handleOpenInfoModal = () => setOpenInfoModal(true);
    const handleCloseInfoModal = () => setOpenInfoModal(false);

    const handleOpenAvatarModal = () => setOpenAvatarModal(true);
    const handleCloseAvatarModal = () => setOpenAvatarModal(false);
    return (
        <section className={classes.root}>
            <div className={classes.container}>
                <div className={classes.userInfo}>
                    <h2 className={classes.title}>Thông tin tài khoản</h2>
                    <div className={classes.userInfoContainer}>
                        <p>
                            <span>Mật khẩu</span>
                            <span>
                                <button onClick={handleOpenPasswordModal}>
                                    Thay đổi mật khẩu
                                </button>
                            </span>
                        </p>
                        <p>
                            <span>Ảnh đại diện</span>
                            <span>
                                <button onClick={handleOpenAvatarModal}>
                                    {user.avatar
                                        ? 'Thay đổi ảnh đại diện'
                                        : 'Thêm ảnh đại diện'}
                                </button>
                            </span>
                        </p>
                        <p>
                            <span>Tên hiển thị</span>
                            <span>{user.displayName || 'Chưa có'}</span>
                        </p>
                        <p>
                            <span>Tên đăng nhập</span>
                            <span>{user.username}</span>
                        </p>

                        <p>
                            <span>Email</span>
                            <span>{user.email}</span>
                        </p>
                        <p>
                            <span>Giới tính</span>
                            <span>{genders[user.gender]}</span>
                        </p>
                    </div>
                    <Button variant="outlined" onClick={handleOpenInfoModal}>
                        Chỉnh sửa
                    </Button>
                </div>
                <div className={classes.notice}>
                    <h2 className={classes.title}>Thông báo</h2>
                    <div className={classes.noticeList}>
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
                </div>
            </div>
            <ChangePasswordModal
                openPasswordModal={openPasswordModal}
                handleClosePasswordModal={handleClosePasswordModal}
            />
            <ChangeInfoModal
                openInfoModal={openInfoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
            <ChangeAvatarModal
                openAvatarModal={openAvatarModal}
                handleCloseAvatarModal={handleCloseAvatarModal}
            />
        </section>
    );
}

Profile.propTypes = {};

export default Profile;
