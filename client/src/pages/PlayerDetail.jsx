import React, { useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPlayerById } from "../reducers/players";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  photo: {
    margin: theme.spacing(1),
    width: theme.spacing(36),
    height: theme.spacing(36),
  },
}));

const Abc = ({ property, value }) => {
  return (
    <ListItem>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography variant="body2" component="span">
              {property}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography variant="h5" component="span">
              {value}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default function PlayerDetail() {
  const classes = useStyles();
  let { id } = useParams();
  const dispatch = useDispatch();
  const { isFetching, players } = useSelector((state) => state.players);
  const player = players[id];
  useEffect(() => {
    dispatch(getPlayerById(id));
  }, [dispatch, id]);

  return (
    !isFetching && (
      <>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1">
            Informace o hráči
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item sm={4} xs={12}>
              <List>
                <Abc property={"Jméno"} value={player.firstname} />
                <Abc property={"Příjmení"} value={player.surname} />
                <Abc
                  property={"Datum narození"}
                  value={new Date(player.birthday).toLocaleDateString()}
                />
                <Abc property={"Dres"} value={player.jerseyNumber} />
              </List>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Paper elevation={3} className={classes.photo} />
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  );
}
