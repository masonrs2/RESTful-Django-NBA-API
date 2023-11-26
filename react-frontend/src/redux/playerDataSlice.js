import { createSlice } from '@reduxjs/toolkit';

export const playerDataSlice = createSlice({
  name: 'playerData',
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    setPlayerDataStore: (state, action) => {
      state.data = action.payload;
    },
    setPlayerDataError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPlayerDataStore, setPlayerDataError } = playerDataSlice.actions;

export default playerDataSlice.reducer;