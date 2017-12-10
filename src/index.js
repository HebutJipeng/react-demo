import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import UserAddPage from "./pages/UserAdd";
import Book from "./pages/Book";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()

const supportsHistory = 'pushState' in window.history;

ReactDOM.render((
    <BrowserRouter forceRefresh={ true }>
        <div>
            <Switch>
                {/* todo */}
                <Route exact path="/" component={HomePage } />
                <Route path="/user" component={UserAddPage } />
                <Route path="/book" component={ Book} />
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'));
