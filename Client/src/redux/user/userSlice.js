import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess : (state, action )=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart: (state) => {
            state.loading = true
        },
        updateSuccess: (state, action ) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.action = action.payload;
            state.loading = false
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess : (state, action )=> {
            state.currentUser = null;
            state.loading = false,
            state.error = null;
        },
        deleteUserFailure: (state, action ) => {
            state.error = action.payload;
            state.loading = false
        }
    }
});

export const {signInFailure, signInStart, signInSuccess, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure} = userSlice.actions;
export default userSlice.reducer;