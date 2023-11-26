import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import playerDataReducer from './playerDataSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, playerDataReducer);

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  });
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
  });
