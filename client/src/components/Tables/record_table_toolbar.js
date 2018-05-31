import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { Toolbar, Typography, Tooltip, IconButton } from 'material-ui';
import { RecordTableToolbarStyle } from './../../styles';

class RecordTableToolbar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Toolbar>
                
            </Toolbar>
        )
    }
}

export default withStyles (RecordTableToolbarStyle)(RecordTableToolbar);