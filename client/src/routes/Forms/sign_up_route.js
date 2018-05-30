import React, { Component, Fragment } from 'react';

import { SignUpForm } from './../../components';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

class SignUp extends Component {
    render() {
        return (
            <Fragment>
                <SignUpForm />
            </Fragment>
        )
    }
}

export default withStyles (styles) (SignUp);