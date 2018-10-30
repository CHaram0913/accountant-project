import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Toolbar, Typography, Tooltip, IconButton, Grid, Badge } from 'material-ui';
import { Delete } from '@material-ui/icons';
import { RecordTableToolbarStyle } from './../../styles';

import { deleteSelectedRecords } from './../../actions';

class RecordTableToolbar extends Component {
    deleteSelected = ids => e => {
        this.props.deleteSelectedRecords(ids);
    }

    render() {
        const { classes, numSelected, selected, total, sortOfAcutalTotal } = this.props;

        return (
            <Toolbar className={classes.root}>
                <Grid container zeroMinWidth>
                    <Grid item xs={10} zeroMinWidth>
                        {numSelected > 0 ? (
                            <Typography variant='display1'>
                                <b>{numSelected}</b> Items, Selected Total: <b> {total} Won </b>
                            </Typography>
                        ) : (
                            <Typography variant='display1'>
                                Your Budget: <b> {sortOfAcutalTotal} Won (<span style={{ color: 'blue' }}>{total}</span>) </b>
                            </Typography>
                        )}  
                    </Grid>
                    <Grid item xs={2} zeroMinWidth>
                        {numSelected > 0 ? (
                            <Tooltip title='Delete'>
                                <IconButton 
                                    aria-label='Delete' 
                                    className={classes.delete_button} 
                                    onClick={this.deleteSelected(selected)}
                                >
                                    <Badge badgeContent={numSelected} color="primary">
                                        <Delete />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Fragment />
                        )}  
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }
}

export default withStyles (RecordTableToolbarStyle) (connect (null, { deleteSelectedRecords }) (RecordTableToolbar));