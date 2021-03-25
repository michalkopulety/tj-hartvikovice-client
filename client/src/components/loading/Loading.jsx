import { Grid } from "@material-ui/core";
import React from "react";
import loading from "../../assets/loading.svg";

const Loading = () => (
  <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center">
          <img src={loading} alt="Loading" />
        </Grid>
      </Grid>
  </Grid>
);

export default Loading;