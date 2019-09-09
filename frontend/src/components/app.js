import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Header from "./layout/header";
import Dashboard from "./leads/dashboard";
import store from '../store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container">
            <Dashboard />
          </div>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
