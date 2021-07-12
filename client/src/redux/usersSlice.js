import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// grab token and form header
const token = JSON.parse(localStorage.getItem('user'))?.token;
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/users/${username}`, header);
      console.log('data', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
