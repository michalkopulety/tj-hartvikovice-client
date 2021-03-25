import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLeftMenuOpen: false
};

const counterSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openLeftPanel(state) {
      state.isLeftMenuOpen = true;
    },
    closeLeftPanel(state) {
        state.isLeftMenuOpen = false;
    }
  },
})

export const { openLeftPanel, closeLeftPanel } = counterSlice.actions
export default counterSlice.reducer