import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Typography, Toolbar, Checkbox, IconButton } from 'material-ui';
import { Table, TableBody, TableCell, TablePagination, TableRow, TableSortLabel } from 'material-ui';
import { RecordTableHead, RecordTableToolbar } from './../../components';
import { RecordTableStyle } from './../../styles';

import { receiveRecordData } from './../../actions';

class RecordTable extends Component {
    async componentWillMount() {
        await this.props.receiveRecordData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.postRecordResult !== this.props.postRecordResult && this.props.postRecordResult === 'Succesful') {
            await this.props.receiveRecordData();
        } else {}
    }

    renderTable(recordState) {
        if (!_.isEmpty(recordState) && recordState.success) {
            return (
                <Table>
                    <RecordTableHead />
                    <TableBody>
                        {recordState.data.map(row => {
                            return (
                                <TableRow
                                    hover
                                    key={row._id}
                                >
                                    <TableCell padding='checkbox'>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell scope='row' padding='none'>
                                        {row.date}
                                    </TableCell>
                                    <TableCell scope='row' padding='none'>
                                        {row.category}
                                    </TableCell>
                                    <TableCell scope='row' padding='none'>
                                        {row.subCategory}
                                    </TableCell>
                                    <TableCell numeric>
                                        {row.amount}
                                    </TableCell>
                                    <TableCell scope='row' padding='none'>
                                        {row.payee}
                                    </TableCell>
                                    <TableCell scope='row' padding='none'>
                                        {row.memo}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )
        } else {
            return (
                <Fragment />
            )
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <Fragment>
                <Paper>
                    <RecordTableToolbar />
                    {this.renderTable(this.props.tableData)}
                </Paper>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        tableData: state.tableData,
        postRecordResult: state.postRecordResult
    }
}

export default withStyles (RecordTableStyle) (connect (mapStateToProps, { receiveRecordData }) (RecordTable));