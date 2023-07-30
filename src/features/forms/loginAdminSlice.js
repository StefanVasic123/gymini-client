import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  password: '',
};

// Login admin slice => currently out of function, because on logout page is hard reloaded and so form data is set to default
export const loginAdminSlice = createSlice({
  name: 'loginAdmin',
  initialState,
  reducers: {
    resetLoginAdminForm: (state) => initialState,
    setFormData(state, action) {
      /*
      let inputLabelKey = Object.keys(action.payload)[0];
      state[inputLabelKey] = Object.values(action.payload)[0];
      */
    },
  },
});

export const { resetLoginAdminForm, setFormData } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;
