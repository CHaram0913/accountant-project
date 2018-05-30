import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../services/history';
import { mainRoutes } from '../routes';
import Reboot from 'material-ui/Reboot';

const mainSwitch = (
    <Switch>
        {mainRoutes.map(function (item, index) {
            if (!index) {
                return (
                    <Route exact key={index} path={item.path} component={item.component} />
                )
            } else {
                return (
                    <Route key={index} path={item.path} component={item.component} />
                )
            }
        })}
        <Redirect to={'/'} />
    </Switch>
);

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Reboot />
                <Router history={history}>
                    { mainSwitch }
                </Router>
            </Fragment>
        );
    }
}