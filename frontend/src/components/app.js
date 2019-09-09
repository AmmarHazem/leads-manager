import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from "./layout/header";
import Dashboard from "./leads/dashboard";
import Alerts from './layout/alerts';
import store from '../store';

const alertOptions = {
  timeout: 5000,
  position: 'top center',
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <Header />
            <Alerts />
            <div className="container">
              <Dashboard />
            </div>
          </Fragment>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
