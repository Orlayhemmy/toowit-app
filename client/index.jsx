/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch
} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import PageGrowth from './Components/PageGrowth/PageGrowth';

// styles
import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Switch>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/page-growth" component={PageGrowth} />
      </div>
    </Switch>
  </Router>,
  document.getElementById('root')
);
