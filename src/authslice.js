import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: [],
    isAuthenticated: false,
  };

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.user.push(action.payload);
            state.isAuthenticated = true;
        },
        
        loginSuccess: (state) => {
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { registerUser, loginSuccess, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.users;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
    
export default authSlice.reducer;