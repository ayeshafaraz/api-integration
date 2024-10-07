// redux/tokensSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for fetching data
export const fetchTokens = createAsyncThunk('tokens/fetchTokens', async () => {
  const response = await axios.get('https://pools-api.mainnet.orca.so/tokens');
  return response.data.data; // Return only the data array
});

const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {
    data: [],
    search: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { setSearch } = tokensSlice.actions;
export default tokensSlice.reducer;
