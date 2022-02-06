import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LogInComponent from './LogInComponent';
import CreateNewAccount from './CreateNewAccount';
import MainPage from './MainPage';
import SubscriptionsPage from './SubscriptionsPage';
import UsersManagmentPage from './UsersManagmentPage';
import BlankPage from './Blank';
import EditUserPage from './EditUserPage';
import AddUserPage from './AddUserPage';

class MainRouter extends Component {

    render() {
        return <div>
            <Switch>
                <Route path='/' component = {LogInComponent} exact/>
                <Route path='/CreateNewAccount' component = {CreateNewAccount}/>
                <Route path='/Movies' component = {MainPage}/>
                <Route path='/Subscriptions' component = {SubscriptionsPage}/>
                <Route path='/UsersManagmentPage/' component = {UsersManagmentPage}/>
                <Route path='/Blank' component = {BlankPage}/>
                <Route path='/AddUser' component = {AddUserPage}/>
                <Route path='/EditUser/:id' component = {EditUserPage}/>
            </Switch>
        </div>;
    }
}

export default MainRouter;