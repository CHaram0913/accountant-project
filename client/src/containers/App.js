import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../services/history';
import { mainRoutes } from '../routes';
import Reboot from 'material-ui/Reboot';

const mainSwitch = (
    <Switch>
        {mainRoutes.map(function (item, index) {
            return (
                item.wrapper ? 'Something else' : <Route key={ index } path={ item.path } component={ item.component }/>
            )
        })}
    </Switch>
);

export default class App extends Component {

    render() {
        return (
            <div>
                <Reboot/>
                <Router history={history}>
                    { mainSwitch }
                </Router>
            </div>
        );
    }
}