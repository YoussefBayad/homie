import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { connectAdvanced } from 'react-redux';

// grab token and form header
const token = JSON.parse(localStorage.getItem('user'))?.token;
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// initial state
const initialState = {
  data: [],
  loading: false,
  error: undefined,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/timeline/${userId}`, header);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ post, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/posts/', post, header);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editPost = createAsyncThunk('posts/editPost', async (newPost) => {
  //   try {
  //     var response = await db.collection('posts').doc(newPost.id).update(newPost);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  //   try {
  //     var response = await db.collection('posts').doc(id).delete();
  //   } catch (error) {
  //     console.error('deletePost', error.message);
  //   }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    lowest(state) {
      state.data.sort((a, b) => (a.likesCount > b.likesCount ? 1 : -1));
    },
    highest(state) {
      state.data.sort((a, b) => (a.likesCount < b.likesCount ? 1 : -1));
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      return { data: action.payload || [], loading: false, error: null };
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    [addPost.pending]: (state, action) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      if (!action.payload) return;

      state.loading = false;
      state.data.push(action.payload);
      state.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    },

    [addPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      if (!action.payload) return;

      state.loading = false;
      state.data = state.data.filter((post) => post.id !== action.payload);
    },
    // [deletePost.rejected]: (state, action) => {},
    // [editPost.pending]: (state, action) => {

    // },
    [editPost.fulfilled]: (state, action) => {
      if (!action.payload) return;

      state.data = state.data.map((post) => {
        if (post.id === action.payload.id) post = action.payload;
        return post;
      });
    },
    // [editPost.rejected]: (state, action) => {},
  },
});

export const { latest, lowest, highest } = postsSlice.actions;

export default postsSlice.reducer;
