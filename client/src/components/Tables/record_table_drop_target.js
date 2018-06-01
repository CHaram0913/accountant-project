import React, { Component, Fragment } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, Typography } from 'material-ui';
import { RecordTableDropTargetStyle } from './../../styles';

import { RecordTable } from './../../containers';

import { handleModal, initializeRecordForm } from './../../actions';

import { Types } from './../../resources';

const tableTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        
        return item;
    }
};

function collect(connect, monitor) {

    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        didDrop: monitor.didDrop(),
        getDropResult: monitor.getDropResult()
    }
}

class TargetTableContainer extends Component {
    callHandleModal(dropState, dropResult) {
        if (dropState) {
            this.props.handleModal(dropState);
            this.props.initializeRecordForm(dropResult);
        }
    }

    render() {
        const { classes, isOver, canDrop, connectDropTarget, didDrop, getDropResult } = this.props;
        let isActive = isOver && canDrop;

        return connectDropTarget(
            <div style={{ opacity: isOver && canDrop ? 0.8 : 1 }} className={classes.root}>
                {this.callHandleModal(didDrop, getDropResult)}
                <Paper style={{ backgroundColor: isActive ? '#E6FFF4' : '' }} className={classes.target_container_paper}>
                    <Typography variant='display2'>
                        This is DND Container
                    </Typography>
                    <RecordTable
                        isActive={isOver && canDrop}
                    />
                </Paper>
            </div>
        )
    }
}

TargetTableContainer = connect(null, { handleModal, initializeRecordForm }) (TargetTableContainer);

export default withStyles (RecordTableDropTargetStyle) (DropTarget(Types.CATEGORY_BLOCK, tableTarget, collect)(TargetTableContainer));