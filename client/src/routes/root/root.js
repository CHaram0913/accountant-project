import React, { Component, Fragment } from 'react';

import { LogIn } from './../../components';
import { RecordModal, ModalButton } from './../../containers';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

class Root extends Component {
    render() {
        return (
            <Fragment>
                <LogIn />
            </Fragment>
        )
    }
}

export default withStyles (styles) (Root);