import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import menuReducer from './menuSlice'; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;