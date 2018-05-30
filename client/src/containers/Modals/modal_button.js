import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Paper, Modal, Button } from 'material-ui';

import { handleModal } from './../../actions';

import RecordModal from './add_record_form_modal';
import { ModalButtonStyle } from './../../styles';

class ModalButton extends Component {
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
                <Button onClick={this.openModal} variant='raised' color='primary'>
                    Add Record
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
        modalOpen: state.modalOpen
    }
}

export default withStyles (ModalButtonStyle) (connect(mapStateToProps, { handleModal }) (ModalButton));