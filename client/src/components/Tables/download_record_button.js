import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, Button, Badge } from 'material-ui';
import { DownloadButtonStyle } from './../../styles';

import { createCsv, createExcel } from './../../actions';

class DownloadButton extends Component {
    downloadRecordDataCSV = download_content => async e => {
        await this.props.createCsv(download_content);
    }

    downloadRecordDataExcel = download_content => async e => {
        await this.props.createExcel(download_content);
    }

    render() {
        const { classes, height, left, top, selected } = this.props;
        let numSelected = selected ? selected.length : 0;

        return (
            <Paper className={classes.root} elevation={0}>
                <span>
                    <Badge badgeContent={numSelected} color='secondary'>
                        <Button 
                            variant='raised'
                            color='primary'
                            className={classes.download_button}
                            type='download'
                            onClick={this.downloadRecordDataCSV(selected)}
                        >
                            Download as CSV
                        </Button>
                    </Badge>
                </span>
                <Badge badgeContent={numSelected} color='secondary'>
                    <Button 
                        variant='raised'
                        color='primary'
                        className={classes.download_button}
                        type='download'
                        onClick={this.downloadRecordDataExcel(selected)}
                    >
                        Download as Excel
                    </Button>
                </Badge>
            </Paper>
        )
    }

}

export default withStyles (DownloadButtonStyle) (connect (null, { createCsv, createExcel }) (DownloadButton));