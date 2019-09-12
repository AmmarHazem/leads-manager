import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from "./layout/header";
import Dashboard from "./leads/dashboard";
import Alerts from './layout/alerts';
import store from '../store';
import Register from './accounts/register';
import Login from './accounts/login';
import PrivateRoute from './common/private_route';
import { loadUser } from '../actions/auth';

const alertOptions = {
  timeout: 5000,
  position: 'top center',
}

class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
