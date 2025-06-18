import { createSlice } from '@reduxjs/toolkit';

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
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem('chatApp_jwtToken', action.payload.token);
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem('chatApp_jwtToken');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
