import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setCurrentChannel } = chatSlice.actions;
export default chatSlice.reducer;