import { createSlice } from '@reduxjs/toolkit';

// Initial state for the menu items
const initialState = [];

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Action to set the menu items in the Redux store
    setMenuItems: (state, action) => {
      return action.payload;
    }
  }
});

export const { setMenuItems } = menuSlice.actions;

export default menuSlice.reducer;
