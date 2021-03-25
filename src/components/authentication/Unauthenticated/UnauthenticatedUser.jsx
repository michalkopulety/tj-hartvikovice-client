import { ButtonGroup } from "@material-ui/core";
import React from "react";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

const AuthNav = () => {
  return (
      <ButtonGroup color="inherit" aria-label="outlined secondary button group">
        <LoginButton/>
        <SignupButton/>
      </ButtonGroup>  
  );
};

export default AuthNav;