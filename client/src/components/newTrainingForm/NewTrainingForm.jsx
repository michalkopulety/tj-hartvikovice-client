import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlace,
  setWeather,
  setDate,
  setTime,
} from "../../reducers/newTraining";
import TimePicker from "../datePicker/TimePicker";
import DatePicker from "../datePicker/DatePicker";

export default function NewTrainingForm() {
  const dispatch = useDispatch();
  const { place, weather, date, time } = useSelector(
    (state) => state.newTraining
  );
  let normalizedDate = new Date(date);
  let normalizedTime = new Date(time);
  const updateState = (setter) => {
    return (event) => {
      dispatch(setter(event.target.value));
    };
  };

  const updateDate = (setter) => {
    return (event) => {
      dispatch(setter(event.getTime()));
    };
  };

  return (
    <form noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start">
        <TextField
          margin="normal"
          id="standard-basic"
          label="place"
          value={place}
          onChange={updateState(setPlace)}
        />
        <TextField
          margin="normal"
          id="filled-basic"
          label="weather"
          value={weather}
          onChange={updateState(setWeather)}
        />
        <DatePicker
          label={"Date"}
          value={normalizedDate}
          setValue={updateDate(setDate)}
        />
        <TimePicker
          label={"Time"}
          value={normalizedTime}
          setValue={updateDate(setTime)}
        />
      </Grid>
    </form>
  );
}
