import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import UserAddPage from "./pages/UserAdd";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()

const supportsHistory = 'pushState' in window.history;

ReactDOM.render((
    <BrowserRouter forceRefresh={ true }>
        <div>
            <ul>
                <li><Link to="/user" >useradd</Link></li>
            </ul>
            <Switch>
                <Route exact path="/add" component={() => { return (<div>111</div>)}} />
                <Route exact path="/" component={HomePage } />
                <Route path="/user" component={UserAddPage } />
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'));
