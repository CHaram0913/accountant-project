import React, { Component, Fragment } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, Typography } from 'material-ui';
import { RecordTableDropTargetStyle } from './../../styles';

import { RecordTable } from './../../containers';

import { handleModal, initializeRecordForm, uploadFile } from './../../actions';

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
    handleDrop(dropState, dropResult) {
        if (dropState && dropResult.dropEffect === 'move') {
            this.props.handleModal(dropState);
            this.props.initializeRecordForm(dropResult);
        } else if (dropState && dropResult.dropEffect === 'copy') {
            this.props.uploadFile(dropResult);
        }
    }

    render() {
        const { classes, isOver, canDrop, connectDropTarget, didDrop, getDropResult } = this.props;
        let isActive = isOver && canDrop;

        return connectDropTarget(
            <div style={{ opacity: isActive ? 0.8 : 1 }} className={classes.root}>
                {this.handleDrop(didDrop, getDropResult)}
                <Paper style={{ backgroundColor: isActive ? '#E6FFF4' : '' }} className={classes.target_container_paper}>
                    <RecordTable
                        isActive={isOver && canDrop}
                    />
                </Paper>
            </div>
        )
    }
}

TargetTableContainer = connect(null, { handleModal, initializeRecordForm, uploadFile }) (TargetTableContainer);

export default withStyles (RecordTableDropTargetStyle) (DropTarget([Types.CATEGORY_BLOCK, NativeTypes.FILE], tableTarget, collect)(TargetTableContainer));