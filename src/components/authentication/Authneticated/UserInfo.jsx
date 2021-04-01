import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const AuthNav = () => {
  const { user } = useSelector((state) => state.authenticatedUser);
  // let initials = `${user.given_name[0]}${user.family_name[0]}`;

  return user ? (
    user.picture ? (
      <Avatar alt={user.name} src={user.picture} button />
    ) : (
      <Avatar alt={user.name} button>
        MK
      </Avatar>
    )
  ) : null;
};

export default AuthNav;
