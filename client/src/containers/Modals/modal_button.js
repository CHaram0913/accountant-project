import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Paper, Modal, Button } from 'material-ui';
import history from './../../services/history';

import { checkLogInState, handleModal } from './../../actions';

import RecordModal from './add_record_form_modal';
import { ModalButtonStyle } from './../../styles';

class ModalButton extends Component {
    async componentWillMount() {
        await this.props.checkLogInState();

        if (!this.props.logInState.isLoggedIn) {
            history.push('/login')
        }
    }

    componentDidMount() {
        this.props.handleModal(false);
    }

    openModal = () => {
        this.props.handleModal(true);
    }

    closeModal = () => {
        this.props.handleModal(false);
    }

    render() {
        const { classes } = this.props;

        return(
            <Fragment>
                <Button onClick={this.openModal} variant='raised' color='primary' className={classes.root}>
                    Add Record Manually
                </Button>
                <Modal
                    open={this.props.modalOpen}
                    onClose={this.closeModal}
                >
                    <Paper className={classes.modal_paper}>
                        <RecordModal />
                    </Paper>
                </Modal>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        logInState: state.logInState,
        modalOpen: state.modalOpen
    }
}

export default withStyles (ModalButtonStyle) (connect(mapStateToProps, { 
    checkLogInState, 
    handleModal
}) (ModalButton));