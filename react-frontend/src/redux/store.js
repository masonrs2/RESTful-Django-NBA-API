import { configureStore } from '@reduxjs/toolkit';
import playerDataReducer from './playerDataSlice';

export const store = configureStore({
  reducer: {
    playerData: playerDataReducer,
  },
});
