import React from "react";
import { Route, Switch } from "react-router-dom";

import Loading from "./components/loading/Loading";
import Home from "./pages/Home";
import Players from "./pages/Players";
import { useAuth0 } from "@auth0/auth0-react";
import PlayerDetail from "./pages/PlayerDetail";
import TrainingAttendance from "./pages/TrainingAttendance";
import BirthDayList from "./pages/BirthdayList";
import CreateTraining from "./pages/CreateTraining";
// import ProtectedRoute from "./auth/ProtectedRoute";

const Navigation = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/players" component={Players} />
      <Route path="/player/:id" component={PlayerDetail} />
      <Route path="/trainings" exact component={TrainingAttendance} />
      <Route path="/trainings/create" component={CreateTraining} />
      <Route path="/birthdays" component={BirthDayList} />
    </Switch>
  );
};

export default Navigation;
