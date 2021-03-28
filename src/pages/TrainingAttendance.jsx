import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getAttendance } from "../reducers/trainingAttendance";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo, setTeam } from "../reducers/trainingAttendance";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DatePicker from "../components/datePicker/DatePicker";
import AttendanceList from "../components/attendanceList/AttendanceList";
import TeamSelection from "../components/teamSelection/TeamSelection";

const useStyles = makeStyles((theme) => ({
  createButton: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function TrainingAttendance() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, from, to, team } = useSelector(
    (state) => state.trainingAttendance
  );
  const onCreateNewTrainingClick = () => {
    history.push(`/trainings/create`);
  };
  const onTeamChange = (event) => {
    dispatch(setTeam(event.target.value));
  };

  useEffect(() => {
    dispatch(getAttendance([from, to, team]));
  }, [dispatch, from, to, team]);

  return (
    !isFetching && (
      <>
        <Grid item xs={12}>
          <Typography variant="h1">Docházka na tréninky</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <TeamSelection value={team} onChange={onTeamChange} />
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                label="From"
                value={from}
                setValue={(date) => {
                  dispatch(setFrom(date));
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <DatePicker
                label="To"
                value={to}
                setValue={(date) => {
                  dispatch(setTo(date));
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" justify="center">
            <AttendanceList />
          </Grid>
        </Grid>
        <Fab
          className={classes.createButton}
          color="primary"
          aria-label="Create new Training"
          onClick={onCreateNewTrainingClick}>
          <AddIcon />
        </Fab>
      </>
    )
  );
}
