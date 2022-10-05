import { configureStore } from '@reduxjs/toolkit';
import web3Reducers from './reducers/web3.reducer';

export const store = configureStore({
  reducer: {
    webthree: web3Reducers,
  },
});
