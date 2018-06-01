import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Types } from './../../resources';

import { withStyles } from 'material-ui/styles';
import { Paper, Typography } from 'material-ui';
import { CategoryDragSourceStyle } from './../../styles';

const categorySource = {
    beginDrag(props) {
        return {
            category: props.record._id,
            interval: props.record.interval,
            average: props.record.average_spending
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class CategoryBlock extends Component {
    render() {
        const { classes, record, isDragging, connectDragSource } = this.props;
        
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 }} className={classes.root}>
                <Paper className={classes.category_block}>
                    <Typography variant='title'>
                        Category: {record._id}
                    </Typography>
                    <Typography variant='subhead'>
                        Interval: {record.interval}
                    </Typography>
                    <Typography variant='subhead'>
                        Latest Record: {record.latest_transaction}
                    </Typography>
                    <Typography variant='subhead'>
                        Latest Payee: {record.latest_payee}
                    </Typography>
                    <Typography variant='subhead'>
                        Average Spending: {record.average_spending}
                    </Typography>
                    <Typography variant='subhead'>
                        Frequency: {record.count}
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles (CategoryDragSourceStyle) (DragSource(Types.CATEGORY_BLOCK, categorySource, collect)(CategoryBlock));