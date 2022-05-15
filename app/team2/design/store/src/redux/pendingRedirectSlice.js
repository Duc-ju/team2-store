import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'pendingRedirect',
    initialState: {
        path: null
    },
    reducers: {
        create: (state, action) => {
            state.path = action.payload.path;
        },
        delete: (state, action) => {
            state = {
                path: null
            };
        }
    }
});
