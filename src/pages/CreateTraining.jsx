import React, { useEffect } from "react";
import { Fab, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../reducers/newTraining";
import { makeStyles } from "@material-ui/core/styles";
import TransferList from "../components/transferList/TransferList";
import NewTrainingForm from "../components/newTrainingForm/NewTrainingForm";
import { client } from "../utils/fetch";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CreateTraining() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, place, weather, date, time, present } = useSelector(
    (state) => state.newTraining
  );
  const createTraining = async (e) => {
    let body = {
      place,
      weather,
      date: new Date(date),
      from: `${new Date(time).getHours()}:${(
        "0" + new Date(time).getMinutes()
      ).slice(-2)}`,
      players: present,
    };
    let response = await client("trainings/create-training", { body });
    history.push("/trainings");
  };

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    !isFetching && (
      <>
        <Grid item xs={12}>
          <Typography variant="h1">Nový trénink</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <NewTrainingForm />
            </Grid>
            <Grid item xs={6}>
              <TransferList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Save"
            className={classes.margin}
            onClick={createTraining}>
            <SaveIcon className={classes.extendedIcon} />
            Uložit
          </Fab>
        </Grid>
      </>
    )
  );
}
