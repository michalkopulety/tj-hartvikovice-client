import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const data = {
    data: {
        id: "asdsadasd",
        name: "Michal",
        surname: "Kopulety"
    }
};

export const getPlayer = createAsyncThunk(
    "player/getPlayer",
    async (playerId) => {
        console.log(playerId);
        let response = await new Promise((resolve) => {
            resolve(data);
        });
        return response.data;
    }
);

const counterSlice = createSlice({
  name: 'player',
  initialState: {
    isFetching: true,
    player: {}
  },
  reducers: {},
  extraReducers: {
    [getPlayer.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.player = action.payload;
    },
  },
})

export default counterSlice.reducer