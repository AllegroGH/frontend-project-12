import { createSlice } from '@reduxjs/toolkit';
import { disconnectSocket } from '../socket';

const initialState = {
  token: localStorage.getItem('chatApp_jwtToken') || null,
  username: localStorage.getItem('chatApp_username') || null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('chatApp_jwtToken', action.payload.token);
      localStorage.setItem('chatApp_username', action.payload.username);
    },
    logout: (state) => {
      disconnectSocket();
      state.token = null;
      state.username = null;
      localStorage.removeItem('chatApp_jwtToken');
      localStorage.removeItem('chatApp_username');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
