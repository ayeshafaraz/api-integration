// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slice/tokensSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
});

export default store;
