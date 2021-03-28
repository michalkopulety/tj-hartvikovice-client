import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getPlayers, setTeam } from "../reducers/players";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../components/playerCard/PlayerCard";
import TeamSelection from "../components/teamSelection/TeamSelection";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Players() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isFetching, team, playerIds } = useSelector((state) => state.players);
  const onTeamChange = (value) => {
    dispatch(setTeam(value.target.value));
  };

  useEffect(() => {
    dispatch(getPlayers(team));
  }, [dispatch, team]);

  return (
    !isFetching && (
      <>
        <Grid item xs={12}>
          <Typography variant="h1">Seznam hráčů</Typography>
        </Grid>
        <Grid item xs={12}>
          <TeamSelection value={team} onChange={onTeamChange} />
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.root} spacing={2}>
            {playerIds.map((id) => (
              <Grid key={id} item xs={6} sm={3}>
                <PlayerCard id={id} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    )
  );
}
