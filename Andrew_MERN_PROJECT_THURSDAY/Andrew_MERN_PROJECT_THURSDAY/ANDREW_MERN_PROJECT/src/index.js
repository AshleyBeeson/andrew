import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import Bugtracker from './Bugtracker';
import EditBug from './EditBug';

ReactDOM.render(
    <Router history = {browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute> 
    <Route path="/Bugtracker" component={Bugtracker} />
    <Route path="/Bugtracker/:bugid" component={EditBug} />
    </Route> 
    </Router>
    ,document.getElementById("app")
);

