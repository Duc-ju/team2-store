import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { noticeSelector } from '../../redux/selectors';
import noticeSlice from '../../redux/noticeSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackNotice() {
    const notice = useSelector(noticeSelector);
    const dispatch = useDispatch();
    return (
        <Snackbar
            open={notice.title.length > 0}
            autoHideDuration={4000}
            onClose={() => dispatch(noticeSlice.actions.close())}
        >
            <Alert
                onClose={() => dispatch(noticeSlice.actions.close())}
                severity={notice.type}
                sx={{ width: '100%' }}
            >
                {notice.title}
            </Alert>
        </Snackbar>
    );
}

export default SnackNotice;
