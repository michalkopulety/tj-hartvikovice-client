import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: undefined,
  token: undefined
};

const counterSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setAuthenticationToken(state, action) {
      state.token = action.payload;
    }
  },
})

export const {
  setUser,
  setIsAuthenticated,
  setAuthenticationToken
} = counterSlice.actions
export default counterSlice.reducer