import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shiftService from './shiftService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userId: user ? user._id : null,
  shifts: [],
  endShift: '',
  shiftNumber: 0,
  shiftDuration: '',
  staffName: '',
  turnover: 0,
  totalTurnover: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const closeShift = createAsyncThunk(
  'clients/closeShift',
  async (shiftData, thunkAPI) => {
    try {
      return await shiftService.closeShift(shiftData);
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

// Get last closed shift
export const getLastShift = createAsyncThunk(
  'clients/getLastShift',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await shiftService.getLastShift(token);
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

// Delete Shift
export const deleteShift = createAsyncThunk(
  'shifts/deleteShift',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await shiftService.deleteShift(id, token);
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

// Get shifts by date
export const getShiftsByDate = createAsyncThunk(
  'clients/getShiftsByDate',
  async (shiftData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await shiftService.getShiftsByDate(shiftData, token);
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

export const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    resetShift: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.endShift = action.payload.endShift;
        state.shiftNumber = action.payload.shiftNumber;
        state.shiftDuration = action.payload.shiftDuration;
        state.staffName = action.payload.staffName;
        state.turnover = action.payload.turnover;
        state.totalTurnover = action.payload.totalTurnover;
      })
      .addCase(getLastShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLastShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.endShift = action.payload[0]?.endShift
          ? action.payload[0]?.endShift
          : '';
        state.shiftNumber = action.payload[0]?.shiftNumber;
        state.shiftDuration = action.payload[0]?.shiftDuration;
        state.staffName = action.payload[0]?.staffName;
        state.turnover = action.payload[0]?.turnover;
      })
      .addCase(getLastShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shifts = state.shifts.filter(
          (shift) => shift._id !== action.payload.id
        );
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShiftsByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShiftsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shifts = action.payload;
      })
      .addCase(getShiftsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetShift } = shiftSlice.actions;
export default shiftSlice.reducer;
