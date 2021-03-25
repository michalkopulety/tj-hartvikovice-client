import { Avatar } from "@material-ui/core";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthNav = () => {
  const { user } = useAuth0();
  let initials = `${user.given_name[0]}${user.family_name[0]}`;

  return user.picture ? 
    (<Avatar alt={user.name} src={user.picture} button/>) :
    (<Avatar alt={user.name} button>{initials}</Avatar>)
};

export default AuthNav;