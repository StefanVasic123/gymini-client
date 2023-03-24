import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  startDate: new Date(),
  endDate: new Date().addDays(1),
  program: '',
};

// update User slice
export const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {
    resetDeleteUserForm: (state) => initialState,
  },
});

export const { deleteFormData, resetDeleteUserForm } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
