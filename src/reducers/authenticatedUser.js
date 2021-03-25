import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null
};

const counterSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn(state, user) {
      state.isAuthenticated = true;
      state.user = user;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
})

export const { logIn, logOut } = counterSlice.actions
export default counterSlice.reducer