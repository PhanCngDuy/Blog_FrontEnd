import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
    },
    reducers: {
        isLoading: (state) => {
            state.isLoading = true;
        },
        isNotLoading: (state) => {
            state.isLoading = false;
        },
    },
});

export default loadingSlice;
export const { isLoading, isNotLoading } = loadingSlice.actions;
