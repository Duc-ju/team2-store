import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
const getCrurrentStorage = () => {
  const currentString = window.localStorage.getItem('user');
  if (currentString) {
    let user = JSON.parse(currentString);
    const refresh = jwt_decode(user.refresh);
    const date = new Date();
    if (date.getTime() / 1000 > refresh.exp) {
      window.localStorage.removeItem('user');
      return null;
    }
    return user;
  }
  return null;
};
export default createSlice({
  name: 'user',
  initialState: {
    current: getCrurrentStorage(),
    isLoading: false,
    error: '',
  },
  reducers: {
    loginStart: (state, action) => {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.current = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.current = null;
      state.isLoading = false;
      state.error = '';
      window.localStorage.removeItem('user');
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.current = action.payload;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
