import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'cart',
  initialState: {
    current: null,
    isLoading: false,
    isShown: false,
    isAddToCartPending: false,
  },
  reducers: {
    show: (state) => {
      state.isShown = true;
    },
    close: (state) => {
      state.isShown = false;
    },
    setFetching: (state) => {
      state.isLoading = true;
    },
    setSuccess: (state, action) => {
      state.current = action.payload;
      state.isLoading = false;
    },
  },
});
