import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {
  getPlayers,
  getTrainings
} from '../utils/fetch'
import {
  Expand,
  Filter,
  FilterOperator,
  Sort,
  SortType
} from '../utils/query/index';

const getMap = (arr) => {
  return arr.reduce((acc, element) => {
    element.trainings = element.trainings.map(training => training._id)
    return {
      [element.id]: element,
      ...acc
    }
  }, {})
};

const getA = (arr) => {
  return arr.reduce((acc, element) => {
    return {
      [element.id]: element,
      ...acc
    }
  }, {})
};

const addDaysToDate = (date, days) => {
  var modifiedDate = date;
  modifiedDate.setDate(date.getDate() + days);
  return modifiedDate;
};

export const getAttendance = createAsyncThunk(
  "trainingAttendance/getAttendance",
  async ([fromTimestamp, toTimestamp, team]) => {
    let playerQuery = {
      expand: new Expand(["trainings"]),
      sort: new Sort({
        sorts: [
          new Sort({
            property: "surname",
            type: SortType.ASCENDING
          }),
          new Sort({
            property: "firstname",
            type: SortType.ASCENDING
          })
        ]
      })
    };

    if (team) {
      playerQuery.filter = new Filter({
        property: "Team",
        operator: FilterOperator.EQ,
        value: team
      });
    }

    let [players, trainings] = await Promise.all([
      getPlayers(playerQuery),
      getTrainings({
        filter: new Filter({
          filters: [
            new Filter({
              property: "date",
              operator: FilterOperator.GTE,
              value: `Timestamp(${fromTimestamp})`
            }),
            new Filter({
              property: "date",
              operator: FilterOperator.LTE,
              value: `Timestamp(${toTimestamp})`
            })
          ]
        })
      })
    ]);
    let playerIDs = players.map(player => player._id);
    let playersMap = getMap(players);
    let trainingsMap = getA(trainings);
    let trainingIDs = trainings.map(training => training._id);


    return {
      playersMap,
      trainingsMap,
      trainingIDs,
      playerIDs
    };
  }
);

const counterSlice = createSlice({
  name: 'trainingAttendance',
  initialState: {
    isFetching: true,
    from: addDaysToDate(new Date(), -30).getTime(),
    to: new Date().getTime(),
    team: "A",
    players: {},
    trainings: {},
    playerIDs: [],
    trainingIDs: []
  },
  reducers: {
    setFrom(state, action) {
      state.from = action.payload.getTime();
    },
    setTo(state, action) {
      state.to = action.payload.getTime();
    },
    setTeam(state, action) {
      state.team = action.payload;
    }
  },
  extraReducers: {
    [getAttendance.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.players = action.payload.playersMap;
      state.trainings = action.payload.trainingsMap;
      state.playerIDs = action.payload.playerIDs;
      state.trainingIDs = action.payload.trainingIDs;
    },
  },
});

export const {
  setFrom,
  setTo,
  setTeam
} = counterSlice.actions;

export default counterSlice.reducer