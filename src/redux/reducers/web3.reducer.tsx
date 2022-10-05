import { createSlice } from '@reduxjs/toolkit';
import {
  walletConnect,
  checkConnectivity,
  getTodos,
  addTodos,
  deleteTodos,
  getaTodo,
  changeTodos,
} from '../../utils/web3.config';

const initialState = {
  entities: [],
  loading: false,
  error: false,
};

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {},
  extraReducers: {
    [walletConnect.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [walletConnect.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [walletConnect.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [checkConnectivity.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [checkConnectivity.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [checkConnectivity.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getTodos.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [getTodos.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [addTodos.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [addTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [addTodos.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [deleteTodos.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [deleteTodos.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getaTodo.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getaTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [getaTodo.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [changeTodos.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [changeTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [changeTodos.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default web3Slice.reducer;
