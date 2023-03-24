import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: { value: '', edited: false },
  lastName: { value: '', edited: false },
  email: { value: '', edited: false },
  phone: { value: '', edited: false },
  startDate: { value: '', edited: false },
  endDate: { value: '', edited: false },
  program: { value: '', edited: false },
};

// update User slice
export const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    resetUpdateUserForm: (state) => initialState,
    updateFormData(state, action) {
      let inputLabelKey = action.payload.type;
      state[inputLabelKey] = {
        value: action.payload.value,
        edited: action.payload.edited,
      };
    },
  },
});

export const { updateFormData, resetUpdateUserForm } = updateUserSlice.actions;
export default updateUserSlice.reducer;
