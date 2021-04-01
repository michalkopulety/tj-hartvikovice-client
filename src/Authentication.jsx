import React, { useEffect } from "react";
import PageLayout from "./PageLayout.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import useAuthenticationToken from "./hooks/useAuthenticationToken";
import {
  setIsAuthenticated,
  setUser,
  setAuthenticationToken,
} from "./reducers/authenticatedUser";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  audience: config.audience,
  scope: config.scope,
  redirectUri: window.location.origin,
  onRedirectCallback,
};

const AuthenticationWrapper = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const token = useAuthenticationToken(isAuthenticated);

  useEffect(() => {
    dispatch(setIsAuthenticated(isAuthenticated));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(setAuthenticationToken(token));
  }, [dispatch, token]);

  return <PageLayout />;
};

export default function Authentication() {
  return (
    <Auth0Provider {...providerConfig}>
      <AuthenticationWrapper />
    </Auth0Provider>
  );
}
