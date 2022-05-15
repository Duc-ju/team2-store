import userApi from '../api/userApi';
import jwt_decode from 'jwt-decode';
import userSlice from './userSlice';
import noticeSlice from './noticeSlice';
import pendingRedirectSlice from './pendingRedirectSlice';

export const handleLogin = async (
    data,
    dispatch,
    navigate,
    pendingRedirect
) => {
    dispatch(userSlice.actions.loginStart());
    try {
        const userAuthen = await userApi.login(data);
        if (userAuthen.access) {
            window.localStorage.setItem(
                'user',
                JSON.stringify({
                    access: userAuthen.access,
                    refresh: userAuthen.refresh
                })
            );
            const tokenInfo = jwt_decode(userAuthen.access);
            const userInfo = await userApi.getInfo(tokenInfo.user_id);
            const user = {
                ...userInfo,
                ...userAuthen
            };
            window.localStorage.setItem('user', JSON.stringify(user));
            dispatch(userSlice.actions.loginSuccess(user));
            if (pendingRedirect.path) {
                navigate(pendingRedirect.path);
                dispatch(pendingRedirectSlice.actions.delete());
            } else navigate('/');
            dispatch(
                noticeSlice.actions.show({
                    title: 'Đăng nhập thành công',
                    type: 'success'
                })
            );
        } else {
            dispatch(userSlice.actions.loginFailure('Đăng nhập thất bại'));
            dispatch(
                noticeSlice.actions.show({
                    title: 'Đăng nhập nhất bại',
                    type: 'error'
                })
            );
        }
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 401) {
            dispatch(
                userSlice.actions.loginFailure(
                    'Tài khoản hoặc mật khẩu không chính xác'
                )
            );
            dispatch(
                noticeSlice.actions.show({
                    title: 'Tài khoản hoặc mật khẩu không chính xác',
                    type: 'error'
                })
            );
        } else {
            userSlice.actions.loginFailure('Đăng nhập thất bại');
            dispatch(
                noticeSlice.actions.show({
                    title: 'Đăng nhập nhất bại',
                    type: 'error'
                })
            );
        }
    }
};

export const handleRegister = async (data, dispatch, navigate) => {
    dispatch(userSlice.actions.registerStart());
    try {
        const registerUser = await userApi.register(data);
        if (registerUser.id) {
            dispatch(userSlice.actions.registerSuccess());
            dispatch(
                noticeSlice.actions.show({
                    title: 'Đăng kí tài khoản thành công',
                    type: 'success'
                })
            );
            navigate('/login');
        } else if (registerUser.username) {
            dispatch(
                userSlice.actions.registerFailure(
                    'Tên tài khoản đã được sử dụng'
                )
            );
            dispatch(
                noticeSlice.actions.show({
                    title: 'Tên tài khoản đã được sử dụng',
                    type: 'error'
                })
            );
        } else if (registerUser.email) {
            dispatch(userSlice.actions.registerFailure('Email không hợp lệ'));
            dispatch(
                noticeSlice.actions.show({
                    title: 'Email không hợp lệ',
                    type: 'error'
                })
            );
        }
    } catch (e) {
        dispatch(userSlice.actions.registerFailure('Có lỗi xảy ra'));
        dispatch(
            noticeSlice.actions.show({
                title: 'Có lỗi xảy ra',
                type: 'error'
            })
        );
    }
};
