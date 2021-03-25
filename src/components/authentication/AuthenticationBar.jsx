import React from "react";
import AuthneticatedUser from "./Authneticated/AuthneticatedUser";
import UnauthenticatedUser from "./Unauthenticated/UnauthenticatedUser";
import { useAuth0 } from "@auth0/auth0-react";

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <AuthneticatedUser /> : <UnauthenticatedUser />;
};

export default AuthNav;