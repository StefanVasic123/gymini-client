import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: new Date(),
  shiftNumber: null,
  shiftRange: [],
  staff: '',
  addedUsers: [],
  turnover: 0,
  totalTurnover: 0,
};

// show/hide modal
export const endShiftNotificationSlice = createSlice({
  name: 'endShiftNotification',
  initialState,
  reducers: {
    setEndShiftNotificationModal(state, action) {
      state.date = action.payload.date;
      state.shiftNumber = action.payload.shiftNumber;
      state.shiftRange = action.payload.shiftRange;
      state.staff = action.payload.staff;
      state.addedUsers = action.payload.addedUsers;
      state.turnover = action.payload.turnover;
      state.totalTurnover = action.payload.totalTurnover;
    },
  },
});

export const { setEndShiftNotificationModal } =
  endShiftNotificationSlice.actions;
export default endShiftNotificationSlice.reducer;
