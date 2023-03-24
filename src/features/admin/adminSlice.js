import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showHomePage: true,
  showReportsPage: false,
  showSettingsPage: false,
  showAccountPage: false,
};

// show/hide page
export const adminSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setShowHomePage(state, action) {
      state.showHomePage = action.payload;
    },
    setShowReportsPage(state, action) {
      state.showReportsPage = action.payload;
    },
    setShowSettingsPage(state, action) {
      state.showSettingsPage = action.payload;
    },
    setShowAccountPage(state, action) {
      state.showAccountPage = action.payload;
    },
  },
});

export const {
  setShowHomePage,
  setShowReportsPage,
  setShowSettingsPage,
  setShowAccountPage,
} = adminSlice.actions;
export default adminSlice.reducer;
