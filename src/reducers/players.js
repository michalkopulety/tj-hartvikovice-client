import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/fetch";
import { Filter, FilterOperator, Sort, SortType } from "../utils/query/index";

export const getPlayers = createAsyncThunk(
  "players/getPlayers",
  async ([team, token]) => {
    let query = {
      sort: new Sort({
        sorts: [
          new Sort({
            property: "surname",
            type: SortType.ASCENDING,
          }),
          new Sort({
            property: "firstname",
            type: SortType.ASCENDING,
          }),
        ],
      }),
    };
    if (team) {
      query.filter = new Filter({
        property: "Team",
        operator: FilterOperator.EQ,
        value: team,
      });
    }
    query.token = token;

    let response = await client("api/players", query);
    let playerIds = response.map((player) => player._id);
    let players = response.reduce((acc, player) => {
      return {
        [player._id]: player,
        ...acc,
      };
    }, {});
    return {
      playerIds,
      players,
    };
  }
);

export const getPlayerById = createAsyncThunk(
  "players/getPlayerById",
  async (id) => {
    let response = await client(`api/players/${id}`, {});
    return {
      player: response,
      id: response._id,
    };
  }
);

const counterSlice = createSlice({
  name: "players",
  initialState: {
    isFetching: true,
    team: "A",
    players: {},
    playerIds: [],
    playersBirthdays: [],
    playersNamedays: [],
  },
  reducers: {
    setTeam(state, action) {
      state.team = action.payload;
    },
  },
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
        ...state.players,
      };
      state.playerIds = state.playerIds.includes(id)
        ? [...state.playerIds]
        : [id, ...state.playerIds];
    },
  },
});

export const { setTeam } = counterSlice.actions;

export default counterSlice.reducer;
