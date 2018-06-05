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
                    <Typography variant='title' className={classes.category_block_text_title}>
                        <b>{record._id}</b>
                    </Typography>
                    <Typography variant='subheading' className={classes.category_block_text}>
                        Interval: <b>{record.interval}</b>
                    </Typography>
                    <Typography variant='subheading' className={classes.category_block_text}>
                        Latest Record: <b>{record.latest_transaction}</b>
                    </Typography>
                    <Typography variant='subheading' className={classes.category_block_text}>
                        Average Spending: <b>{record.average_spending}</b>
                    </Typography>
                    <Typography variant='subheading' className={classes.category_block_text}>
                        Frequency: <b>{record.count}</b>
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles (CategoryDragSourceStyle) (DragSource(Types.CATEGORY_BLOCK, categorySource, collect)(CategoryBlock));