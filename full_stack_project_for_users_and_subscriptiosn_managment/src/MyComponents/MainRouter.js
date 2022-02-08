import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LogInComponent from './LogInComponent';
import CreateNewAccount from './CreateNewAccount';
import MoviesPage from './Movies/MoviesManagmentPage';
import SubscriptionsPage from './Subscriptions/SubscriptionsManagmentPage';
import UsersManagmentPage from './UserManagment/UsersManagmentPage';
import BlankPage from './Blank';

class MainRouter extends Component {

    render() {
        return <div>
            <Switch>
                <Route path='/' component = {LogInComponent} exact/>
                <Route path='/CreateNewAccount' component = {CreateNewAccount}/>
                <Route path='/Movies/' component = {MoviesPage}/>
                <Route path='/Subscriptions/' component = {SubscriptionsPage}/>
                <Route path='/UsersManagmentPage/' component = {UsersManagmentPage}/>
                <Route path='/Blank' component = {BlankPage}/>
            </Switch>
        </div>;
    }
}

export default MainRouter;