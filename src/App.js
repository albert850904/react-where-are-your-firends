import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/containers/Users";
import NewPlace from "./places/containers/NewPlace";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
