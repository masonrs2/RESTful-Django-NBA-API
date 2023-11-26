import { createSlice } from '@reduxjs/toolkit';

export const playerDataSlice = createSlice({
  name: 'playerData',
  initialState: [],
  reducers: {
    setPlayerDataStore: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPlayerDataStore } = playerDataSlice.actions;

export default playerDataSlice.reducer;