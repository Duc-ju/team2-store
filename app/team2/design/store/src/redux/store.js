import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import noticeSlice from './noticeSlice';
import cartSlice from '../components/Header/cartSlice';
import pendingRedirectSlice from './pendingRedirectSlice';
import productSlice from './productSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        notice: noticeSlice.reducer,
        cart: cartSlice.reducer,
        pendingRedirect: pendingRedirectSlice.reducer,
        product: productSlice.reducer
    }
});

export default store;
