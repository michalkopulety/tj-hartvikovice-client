import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { getPlayers } from "../reducers/players";
import BdList from "../components/bdList/BdList";
import {
  getOrderedPlayerBirthdays,
  getOrderedPlayerNameDays,
} from "../components/bdList/utils";

export default function BirthDayList() {
  const dispatch = useDispatch();
  const { isFetching, players } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  const orderedPlayerBirthdays = getOrderedPlayerBirthdays(players);
  const orderedPlayerNameDays = getOrderedPlayerNameDays(players);

  return (
    !isFetching && (
      <>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1">
            Narozeniny a svátky
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item sm={4} xs={12}>
              <BdList list={orderedPlayerBirthdays} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <BdList list={orderedPlayerNameDays} />
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  );
}
