import React from "react";
import AuthneticatedUser from "./Authneticated/AuthneticatedUser";
import UnauthenticatedUser from "./Unauthenticated/UnauthenticatedUser";
import { useSelector } from "react-redux";

const AuthNav = () => {
  const { isAuthenticated } = useSelector((state) => state.authenticatedUser);

  return isAuthenticated ? <AuthneticatedUser /> : <UnauthenticatedUser />;
};

export default AuthNav;
