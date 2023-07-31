import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import packagePriceService from './packageService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userId: user ? user._id : null,
  dailyPrice: null,
  monthlyPrice: null,
  yearlyPrice: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// SET/POST
export const setPackagePrices = createAsyncThunk(
  'clients/setPackagePrices',
  async (packagePricesData, thunkAPI) => {
    try {
      return await packagePriceService.setPackagePrices(packagePricesData);
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

export const getPackagePrices = createAsyncThunk(
  'clients/getPackagePrices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await packagePriceService.getPackagePrices(token);
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

export const packagePricesSlice = createSlice({
  name: 'packagePrices',
  initialState,
  reducers: {
    resetPackagePrices: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPackagePrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPackagePrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dailyPrice = action.payload.dailyPrice;
        state.monthlyPrice = action.payload.monthlyPrice;
        state.yearlyPrice = action.payload.yearlyPrice;
      })
      .addCase(getPackagePrices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackagePrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dailyPrice = action.payload[0]?.dailyPrice;
        state.monthlyPrice = action.payload[0]?.monthlyPrice;
        state.yearlyPrice = action.payload[0]?.yearlyPrice;
      });
  },
});

export const { resetPackagePrices } = packagePricesSlice.actions;
export default packagePricesSlice.reducer;
