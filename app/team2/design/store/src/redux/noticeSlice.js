import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'notice',
  initialState: {
    title: '',
    type: 'success',
  },
  reducers: {
    show: (state, action) => {
      state.title = action.payload.title;
      state.type = action.payload.type ? action.payload.type : 'success';
    },
    close: (state, action) => {
      state.title = '';
      state.type = 'success';
    },
  },
});
