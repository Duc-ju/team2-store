import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'productSlice',
    initialState: {
        book: [],
        clothes: [],
        laptop: []
    },
    reducers: {
        setBooks: (state, action) => {
            return {
                book: [...action.payload],
                clothes: [...state.clothes],
                laptop: [...state.laptop]
            };
        },
        setClothes: (state, action) => {
            return {
                book: [...state.book],
                clothes: [...action.payload],
                laptop: [...state.laptop]
            };
        },
        setLaptops: (state, action) => {
            return {
                book: [...state.book],
                clothes: [...state.clothes],
                laptop: [...action.payload]
            };
        }
    }
});
