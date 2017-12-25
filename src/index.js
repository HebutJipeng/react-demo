import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import UserAddPage from "./pages/UserAdd";
import Book from "./pages/Book";
import Login from "./pages/Login";
import { createBrowserHistory } from 'history';
import HomeLayout from "./layouts/HomeLayout";
const history = createBrowserHistory()

const supportsHistory = 'pushState' in window.history;

ReactDOM.render((
    <BrowserRouter forceRefresh={ true }>
        <Switch>
            {/* todo */}
            <Route path="/login" component = {Login} />
            <HomeLayout>
                <Route exact path="/" component={HomePage } />
                <Route path="/user" component={UserAddPage } />
                <Route path="/book" component={ Book} />
            </HomeLayout>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
