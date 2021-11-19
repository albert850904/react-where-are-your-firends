import React, { useCallback, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/containers/Users";
import NewPlace from "./places/containers/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/containers/UserPlaces";
import UpdatePlace from "./places/containers/UpdatePlace";
import Auth from "./user/containers/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:uid/places" component={UserPlaces} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Route path="/places/:placeId" component={UpdatePlace} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:uid/places" component={UserPlaces} exact />
        <Route path="/auth" component={Auth} exact />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  /* new 要優先於 :placeId 因為 /places/new 其實也符合 :placeId 格式 */
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
