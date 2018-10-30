import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../services/history';
import { mainRoutes } from '../routes';
import Reboot from 'material-ui/Reboot';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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
            <DragDropContextProvider backend={HTML5Backend}>
                <Fragment>     
                    <Reboot />
                    <Router history={history}>
                        { mainSwitch }
                    </Router>
                </Fragment>
            </DragDropContextProvider>
        );
    }
}