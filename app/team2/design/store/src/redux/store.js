import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import noticeSlice from './noticeSlice';
import cartSlice from '../components/Header/cartSlice';
import pendingRedirectSlice from './pendingRedirectSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        notice: noticeSlice.reducer,
        cart: cartSlice.reducer,
        pendingRedirect: pendingRedirectSlice.reducer
    }
});

export default store;
