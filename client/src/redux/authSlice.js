import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// register thunk
export const register = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/register', user);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// login thunk
export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/login', user);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editUserInfo = createAsyncThunk(
  'user/editUserInfo',
  async (newUserInfo) => {
    try {
    } catch (error) {
      console.error(error.message);
    }
  }
);

// auth slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authChange(state, action) {
      return (state = action.payload);
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      if (!action.payload) return;
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    [register.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    [register.rejected]: (state, action) => {
      if (!action.payload) return;
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
  },
});

export const { authChange } = authSlice.actions;

export default authSlice.reducer;
