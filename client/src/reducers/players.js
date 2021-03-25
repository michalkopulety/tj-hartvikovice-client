import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from '../utils/fetch';

export const getPlayers = createAsyncThunk(
    "players/getPlayers",
    async () => {
        let response = await client("players", {});
        let playerIds = response.map(player=> player._id);
        let players = response.reduce((acc, player) => {
          return {
            [player._id]: player,
            ...acc
          };
        }, {})
        return {
          playerIds,
          players
        };
    }
);

export const getPlayerById = createAsyncThunk(
  "players/getPlayerById",
  async (id) => {
      let response = await client(`players/edit-player/${id}`, {});
      return {
        player: response,
        id: response._id
      };
  }
);

const counterSlice = createSlice({
  name: 'players',
  initialState: {
    isFetching: true,
    players: {},
    playerIds: [],
    playersBirthdays: [],
    playersNamedays: []
  },
  reducers: {},
  extraReducers: {
    [getPlayers.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.players = action.payload.players;
      state.playerIds = action.payload.playerIds;
    },
    [getPlayerById.fulfilled]: (state, action) => {
      let id = action.payload.id;
      state.isFetching = false;
      state.players = {
        [id]: action.payload.player, 
        ...state.players
      };
      state.playerIds = state.playerIds.includes(id) ? [...state.playerIds] : [id, ...state.playerIds];
    },
  },
})

export default counterSlice.reducer