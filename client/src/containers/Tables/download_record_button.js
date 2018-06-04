import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';
import { DownloadButtonStyle } from './../../styles';

import { createCsv, createExcel } from './../../actions';

class DownloadButton extends Component {
    downloadRecordDataCSV = download_content => async e => {
        await this.props.createCsv(download_content.data);
    }

    downloadRecordDataExcel = download_content => async e => {
        await this.props.createExcel(download_content.data);
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <span>
                    <Button 
                        variant='raised'
                        color='primary'
                        className={classes.download_button}
                        type='download'
                        onClick={this.downloadRecordDataCSV(this.props.tableData)}
                    >
                        Download as CSV
                    </Button>
                </span>
                <Button 
                    variant='raised'
                    color='primary'
                    className={classes.download_button}
                    type='download'
                    onClick={this.downloadRecordDataExcel(this.props.tableData)}
                >
                    Download as Excel
                </Button>
            </Fragment>
        )
    }

}

function mapStateToProps(state) {
    return {
        tableData: state.tableData,
        csvFile: state.csvFile,
        excelFile: state.excelFile
    }
}

export default withStyles (DownloadButtonStyle) (connect (mapStateToProps, { createCsv, createExcel }) (DownloadButton));