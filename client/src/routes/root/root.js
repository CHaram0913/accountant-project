import React, { Component, Fragment } from 'react';

import { ModalButton } from './../../containers';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

class Root extends Component {
    render() {
        return (
            <Fragment>
                <ModalButton />
            </Fragment>
        )
    }
}

export default withStyles (styles) (Root);