import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddClientModal: false,
  showUpdateClientModal: false,
  showDeleteClientModal: false,
  showEndShifttModal: false,
  showEndShiftNotificationModal: false,
  showReportsModal: false,
};

// show/hide modal
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowAddClientModal(state, action) {
      state.showAddClientModal = action.payload;
    },
    setShowUpdateClientModal(state, action) {
      state.showUpdateClientModal = action.payload;
    },
    setShowDeleteClientModal(state, action) {
      state.showDeleteClientModal = action.payload;
    },
    setShowEndShiftModal(state, action) {
      state.showEndShiftModal = action.payload;
    },
    setShowEndShiftNotificationModal(state, action) {
      state.showEndShiftNotificationModal = action.payload;
    },
    setShowReportsModal(state, action) {
      state.showReportsModal = action.payload;
    },
  },
});

export const {
  setShowAddClientModal,
  setShowUpdateClientModal,
  setShowDeleteClientModal,
  setShowEndShiftModal,
  setShowEndShiftNotificationModal,
  setShowReportsModal,
} = modalSlice.actions;
export default modalSlice.reducer;
