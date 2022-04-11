import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import noticeSlice from './noticeSlice';
import cartSlice from '../components/Header/cartSlice';
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notice: noticeSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
