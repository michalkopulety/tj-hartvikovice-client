import React from "react";
import clsx from "clsx";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { openLeftPanel } from "../../reducers/layout";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationBar from "../authentication/AuthenticationBar";

export default function Header({ classes }) {
  const dispatch = useDispatch();
  const { isLeftMenuOpen } = useSelector((state) => state.layout);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, isLeftMenuOpen && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            dispatch(openLeftPanel());
          }}
          className={clsx(
            classes.menuButton,
            isLeftMenuOpen && classes.menuButtonHidden
          )}>
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          TJ Harťál
        </Typography>
        <AuthenticationBar />
      </Toolbar>
    </AppBar>
  );
}
