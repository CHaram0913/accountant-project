import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Typography } from 'material-ui';
import { CategorySideBarStyle } from './../../styles';

class CategorySideBar extends Component {
    render() {
        const { classes } = this.props;

        return(
            <Fragment>
                <Paper>
                    <Typography variant='display4'>
                        This is SideBar
                    </Typography>
                </Paper>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

export default withStyles (CategorySideBarStyle) (connect (mapStateToProps, {}) (CategorySideBar));