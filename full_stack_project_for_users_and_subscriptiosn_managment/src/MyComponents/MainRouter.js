import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LogInComponent from './LogInComponent';
import CreateNewAccount from './CreateNewAccount';
import MainPage from './MainPage';

class MainRouter extends Component {

    render() {
        return <div>
            <Switch>
                <Route path='/' component = {LogInComponent} exact/>
                <Route path='/CreateNewAccount' component = {CreateNewAccount}/>
                <Route path='/MainPage' component = {MainPage}/>
            </Switch>

        </div>;
    }
}

export default MainRouter;