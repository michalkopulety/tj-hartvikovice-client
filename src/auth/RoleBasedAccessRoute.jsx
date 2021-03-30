import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { hasUserRequiredPermissions } from "./authenticationUtils";
import Home from "../pages/Home";

const RoleBasedAccessRoute = ({ component, requiredActions, path }) => {
  const { user } = useAuth0();

  return hasUserRequiredPermissions(user, requiredActions) ? (
    <Route path={path} component={component} />
  ) : (
    <Route path="/" component={Home} />
  );
};

RoleBasedAccessRoute.defaultProps = {
  component: () => null,
};

export default RoleBasedAccessRoute;
