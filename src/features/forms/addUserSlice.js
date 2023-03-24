import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const initialState = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  startDate: new Date(),
  endDate: new Date().addDays(1),
  program: '',
};

// add User slice
export const addUserSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    resetAddUserForm: (state) => initialState,
    setFormData(state, action) {
      let inputLabelKey = Object.keys(action.payload)[0];
      state[inputLabelKey] = Object.values(action.payload)[0];
    },
  },
});

export const { resetAddUserForm, setFormData } = addUserSlice.actions;
export default addUserSlice.reducer;
