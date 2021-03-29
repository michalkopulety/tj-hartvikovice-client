import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { setAbsent, setPresent, setChecked } from "../../reducers/newTraining";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../reducers/players";
import TransferPanel from "./TransferPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const dispatch = useDispatch();
  const { absent, present, checked, team } = useSelector(
    (state) => state.newTraining
  );

  useEffect(() => {
    dispatch(getPlayers(team));
  }, [dispatch, team]);
  const classes = useStyles();

  const leftChecked = intersection(checked, absent);
  const rightChecked = intersection(checked, present);
  const setState = (present, absent, checked) => {
    dispatch(setPresent(present));
    dispatch(setAbsent(absent));
    dispatch(setChecked(checked));
  };

  const handleCheckedRight = () => {
    setState(
      present.concat(leftChecked),
      not(absent, leftChecked),
      not(checked, leftChecked)
    );
  };

  const handleCheckedLeft = () => {
    setState(
      absent.concat(rightChecked),
      not(present, rightChecked),
      not(checked, rightChecked)
    );
  };

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}>
      <Grid item>
        <TransferPanel title={"Choices"} items={absent} />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <TransferPanel title={"Chosen"} items={present} />
      </Grid>
    </Grid>
  );
}
