import React, { Component, Fragment } from 'react';

import { withStyles } from 'material-ui/styles';
import { Paper, Grid } from 'material-ui';
import { RootRouteStyle } from './../../styles';

import { TargetTableContainer } from './../../components';
import { ModalButton, CategorySideBar } from './../../containers';

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
                        <TargetTableContainer />
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles (RootRouteStyle)(Root);