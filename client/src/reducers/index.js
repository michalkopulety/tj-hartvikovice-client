import { combineReducers } from "redux";

// reducers
import authenticatedUser from "./authenticatedUser";
import layout from "./layout";
import players from "./players";
import player from "./player";
import trainingAttendance from "./trainingAttendance";
import newTraining from "./newTraining";

export default combineReducers({
    authenticatedUser,
    layout,
    player,
    players,
    trainingAttendance,
    newTraining
});