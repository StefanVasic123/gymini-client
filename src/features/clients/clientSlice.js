import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from './clientService';

const client = JSON.parse(localStorage.getItem('client'));

const initialState = {
  clients: [],
  client: client ? client : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new Client
export const createClient = createAsyncThunk(
  'clients/create',
  async (clientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.createClient(clientData, token);
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

// Login client
export const loginClient = createAsyncThunk(
  'auth/client-login',
  async (client, thunkAPI) => {
    try {
      return await clientService.loginClient(client);
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

export const logoutClient = createAsyncThunk('auth/client-logout', async () => {
  await clientService.logoutClient();
});

// Get user clients
export const getClients = createAsyncThunk(
  'clients/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user?.token;

      return await clientService.getClients(token);
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

// Delete user Client
export const deleteClient = createAsyncThunk(
  'clients/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.deleteClient(id, token);
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

// Update user clients
export const updateClient = createAsyncThunk(
  'clients/update',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.updateClient(id, token);
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

// Get currently cash balance
export const getTodayCreatedClients = createAsyncThunk(
  'clients/getTodayCreatedClients',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.getTodayCreatedClients(token);
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

// Get clients by date
export const getClientsByDate = createAsyncThunk(
  'clients/getClientsByDate',
  async (shiftData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.getClientsByDate(shiftData, token);
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

// Get clients by month
export const getClientsByMonth = createAsyncThunk(
  'clients/getClientsByMonth',
  async (shiftData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.getClientsByMonth(shiftData, token);
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

// Get clients by year
export const getClientsByYear = createAsyncThunk(
  'clients/getClientsByYear',
  async (shiftData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await clientService.getClientsByYear(shiftData, token);
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

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetClients: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload.id
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        let updatedClientIndex = state.clients.map((client, index) => {
          if (client._id === action.payload._id) {
            return index;
          }
        });
        state.isLoading = false;
        state.isSuccess = true;
        state.clients[
          Number(updatedClientIndex.filter((item) => item !== undefined))
        ] = action.payload;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.client = null;
      })
      .addCase(logoutClient.fulfilled, (state) => {
        state.client = null;
      })
      .addCase(getTodayCreatedClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodayCreatedClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getTodayCreatedClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientsByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClientsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientsByMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientsByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClientsByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientsByYear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientsByYear.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClientsByYear.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetClients } = clientSlice.actions;
export default clientSlice.reducer;
