import React, { Component, Fragment } from 'react';

import { LogInForm } from './../../containers';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

class LogIn extends Component {
    render() {
        return (
            <Fragment>
                <LogInForm />
            </Fragment>
        )
    }
}

export default withStyles (styles) (LogIn);