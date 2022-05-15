import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import noticeSlice from '../redux/noticeSlice';
import pendingRedirectSlice from '../redux/pendingRedirectSlice';

function useLoginRequire() {
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        if (user.current === null) {
            dispatch(
                pendingRedirectSlice.actions.create({
                    path: location.pathname
                })
            );
            navigate('/login');
            dispatch(
                noticeSlice.actions.show({
                    type: 'error',
                    title: 'Bạn vui lòng đăng nhập để thực hiện chức năng này'
                })
            );
        }
    }, [user.current]);
}

export default useLoginRequire;
