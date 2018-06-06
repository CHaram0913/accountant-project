import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from './../../services/history';

import { withStyles } from 'material-ui/styles';
import { Paper, Button, Badge } from 'material-ui';
import { DownloadButtonStyle } from './../../styles';

import { createCsv, createExcel, clearFileResult } from './../../actions';

//import axios from 'axios';

class DownloadButton extends Component {
    async componentDidUpdate(prevProps) {
        if (prevProps.csvFileResult !== this.props.csvFileResult && this.props.csvFileResult.success) {
            
            //history.push('/api/record/download_csv');
            console.log(this.props.csvFileResult)
        } else if (prevProps.excelFileResult !== this.props.excelFileResult && this.props.excelFileResult.success) {
            // let res = await axios.get('/api/record/download_excel');
            // let xhr = new XMLHttpRequest();
            // xhr.open('GET', '/api/record/download_excel');
            // xhr.send();
            // history.push('/api/record/download_excel');

            console.log(this.props.excelFileResult)
        }
    }

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

function mapStateToProps(state) {
    return {
        csvFileResult: state.csvFile,
        excelFileResult: state.excelFile
    }
}

export default withStyles (DownloadButtonStyle) (connect (mapStateToProps, { createCsv, createExcel }) (DownloadButton));