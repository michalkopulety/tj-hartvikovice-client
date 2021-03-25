import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    backgroundColor: "black",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function PlayerCard({ id }) {
  const classes = useStyles();
  const history = useHistory();
  const onNavigationClick = () => {
    history.push(`/player/${id}`);
  };
  const { players } = useSelector((state) => state.players);
  const player = players[id];

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {player.surname}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {player.firstname}
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.controls}>
            <Button size="small" color="primary" onClick={onNavigationClick}>
              Show Detail
            </Button>
          </div>
        </CardActions>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
}
