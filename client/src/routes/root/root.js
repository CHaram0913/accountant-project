import React, { Component, Fragment } from 'react';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Typography } from 'material-ui';
import { RootRouteStyle } from './../../styles';

import { ModalButton, CategorySideBar, RecordTable } from './../../containers';

class Root extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Grid container className={classes.root} zeroMinWidth>
                    <Grid item xs={3} zeroMinWidth>
                        <Paper>
                            <ModalButton />
                            <CategorySideBar />
                        </Paper>
                    </Grid>

                    <Grid item xs={9} zeroMinWidth>
                        <DragDropContextProvider backend={HTML5Backend}>
                            <Paper className={classes.dnd_container_paper}>
                                <Typography variant='display2'>
                                    This is DND Container
                                </Typography>
                                <RecordTable />
                            </Paper>
                        </DragDropContextProvider>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles (RootRouteStyle)(Root);