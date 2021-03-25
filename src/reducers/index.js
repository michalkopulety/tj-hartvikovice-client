import {
    combineReducers
} from "redux";

// reducers
import authenticatedUser from "./authenticatedUser";
import layout from "./layout";
import players from "./players";
import trainingAttendance from "./trainingAttendance";
import newTraining from "./newTraining";

export default combineReducers({
    authenticatedUser,
    layout,
    players,
    trainingAttendance,
    newTraining
});