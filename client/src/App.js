import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import Store from "./store";
import Alerts from "./components/layouts/Alerts";
import "./App.css";
import { loadUser } from "./actions/register";
import store from "./store";
import { setAxiosHeader } from "./utils/setHeaders";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import CreateProfile from "./components/Dashboard/dasboardForms/CreateProfile";
import EditProfile from "./components/Dashboard/dasboardForms/Edit-profile";
import AddEducation from "./components/Dashboard/dasboardForms/Add-education";
import AddExperience from "./components/Dashboard/dasboardForms/AddExperience";

if (localStorage.token) {
  setAxiosHeader(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alerts />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
            </section>
          </Fragment>
        </Router>
    </Provider>
  );
};
export default App;
