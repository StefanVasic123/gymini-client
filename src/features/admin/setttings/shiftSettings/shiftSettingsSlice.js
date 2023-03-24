import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shiftSettingsService from './shiftSettingsService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userId: user ? user._id : null,
  firstShift: {},
  secondShift: {},
  thirdShift: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// SET/POST
export const setShiftSettings = createAsyncThunk(
  'clients/setShiftSettings',
  async (shiftSettingsData, thunkAPI) => {
    try {
      return await shiftSettingsService.setShiftSettings(shiftSettingsData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET
export const getShiftSettings = createAsyncThunk(
  'clients/getShiftSettings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await shiftSettingsService.getShiftSettings(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const shiftSettingsSlice = createSlice({
  name: 'shiftSettings',
  initialState,
  reducers: {
    resetshiftSettingsShift: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setShiftSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setShiftSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstShift = action.payload.firstShift;
        state.secondShift = action.payload.secondShift;
        state.thirdShift = action.payload.thirdShift;
      })
      .addCase(getShiftSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShiftSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstShift = action.payload[0].firstShift;
        state.secondShift = action.payload[0].secondShift;
        state.thirdShift = action.payload[0].thirdShift;
      });
  },
});

export const { resetShiftSettingsShift } = shiftSettingsSlice.actions;
export default shiftSettingsSlice.reducer;
