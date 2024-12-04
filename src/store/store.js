import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './features/loadingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});
