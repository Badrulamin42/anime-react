import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './slices/animeSlice';

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;