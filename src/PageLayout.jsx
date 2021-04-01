import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import Menu from "./components/layout/Menu";
import { Router } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
// import ProtectedRoute from "./auth/ProtectedRoute";
import Navigation from "./Navigation";

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const theme = createMuiTheme({
  palette: {
    background: {
      navbar: "#5680E9",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Menu />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                <Navigation />
              </Grid>
              <Box pt={4}>
                <Typography>Copyright © Michal Kopulety</Typography>
              </Box>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}
