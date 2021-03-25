import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import User from "./UserInfo";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const AuthNav = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <User/>
        <LogoutButton/>
    </div>
  );
};

export default AuthNav;