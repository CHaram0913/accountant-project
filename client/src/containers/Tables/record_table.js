import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import { Paper, Grid, Checkbox } from 'material-ui';
import { Table, TableBody, TableCell, TablePagination, TableRow } from 'material-ui';
import { RecordTableStyle } from './../../styles';

import { RecordTableHead, RecordTableToolbar, RecordSearchBar } from './../../components';
import { DownloadButton } from './../../containers';
import { receiveRecordData, readUploadedFile } from './../../actions';

class RecordTable extends Component {
    state = {
        order: 'desc',
        orderBy: 'date',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        height: 0,
        left: 0,
        top: 0
    }

    async componentDidUpdate(prevProps) {
        let height = document.getElementById('record-table-root-paper').clientHeight;
        let left = document.getElementById('record-table-root-paper').clientLeft;
        let top = document.getElementById('record-table-root-paper').clientTop;
        if (height !== this.state.height || left !== this.state.left || top !== this.state.top) {
            this.setState({ height, left, top });
        }

        if (prevProps.postRecordResult !== this.props.postRecordResult && this.props.postRecordResult === 'Succesful') {
            await this.props.receiveRecordData(this.props.recordSearchTerm.term);
            this.setState({ data: this.props.tableData.data });

        } else if (prevProps.uploadFileResult !== this.props.uploadFileResult && this.props.uploadFileResult.success) {
            await this.props.readUploadedFile(this.props.uploadFileResult.data);

        } else if (prevProps.readUploadedFileResult !== this.props.readUploadedFileResult && this.props.readUploadedFileResult.success) {
            await this.props.receiveRecordData(this.props.recordSearchTerm.term);
            this.setState({ data: this.props.tableData.data });

        } else if (prevProps.uploadFileResult !== this.props.uploadFileResult && !this.props.uploadFileResult.success) {
            console.log(this.props.uploadFileResult)

        } else if (prevProps.deleteRecords !== this.props.deleteRecords && this.props.deleteRecords.success) {
            this.setState({ selected: [] })
            await this.props.receiveRecordData(this.props.recordSearchTerm.term);
            this.setState({ data: this.props.tableData.data });

        } else if (prevProps.recordSearchTerm !== this.props.recordSearchTerm) {
            await this.props.receiveRecordData(this.props.recordSearchTerm.term);
            this.setState({ data: this.props.tableData.data });
        }
        
    }

    async componentWillMount() {
        await this.props.receiveRecordData(this.props.recordSearchTerm.term);
        this.setState({ data: this.props.tableData.data });
    }

    handleSortRequest = (e, property) => {
        let orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === orderBy && this.state.order === 'desc') {
            order = 'asc';
        }

        let data = order === 'desc'
            ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
        
        this.setState({ data, order, orderBy });
    }

    handleSelectAllClick = (e, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(item => item._id) });
            return;
        }
        this.setState({ selected: [] });
    }

    handleItemClick = id => e => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        this.setState({ selected: newSelected });
    }

    //edit record
    handleDoubleClick = rowData => e => {
        console.log('double click');
        console.log(rowData);
    }

    handlePageChange = (e, page) => {
        this.setState({ page });
    }

    handleRowsPerPageChange = e => {
        this.setState({ rowsPerPage: e.target.value });
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getTotal(data, selected) {
        let sum = 0;
        if (data.length !== 0 && selected.length === 0) {
            let overallTotal = data.map(row => {
                return row.amount;
            }).reduce((sum, val) => sum + val);
            return overallTotal;

        } else if (data.length !== 0 && selected.length > 0) {
            let selectedPrices = [];
            for (let i = 0; i < selected.length; i++){
                let selectedPrice = data.filter(row => row._id === selected[i])[0].amount
                selectedPrices.push(selectedPrice);
            }
            let overallTotal = selectedPrices.reduce((sum, val) => sum + val);
            return overallTotal;
        }
        return sum;
    }

    getSelectedData(data, selected) {
        if (data.length !== 0 && selected.length === 0) {
            return data;
        } else if (data.length !== 0 && selected.length > 0) {
            let selectedData = [];
            for (let i = 0; i < selected.length; i++){
                let selectedDataSingle = data.filter(row => row._id === selected[i])[0];
                selectedData.push(selectedDataSingle);
            }
            return selectedData;
        }
    }

    renderTable(recordState, data, order, orderBy, selected, rowsPerPage, page) {
        if (!_.isEmpty(recordState) && recordState.success) {
            return (
                <Fragment>
                    <Table>
                        <RecordTableHead 
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onSortRequest={this.handleSortRequest}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                const isSelected = this.isSelected(row._id);

                                return (
                                    <TableRow
                                        hover
                                        onClick={this.handleItemClick(row._id)}
                                        onDoubleClick={this.handleDoubleClick(row)}
                                        role='checkbox'
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isSelected}
                                    >
                                        <TableCell padding='checkbox'>
                                            <Checkbox checked={isSelected} />
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
                </Fragment>
            )
        } else {
            return (
                <Fragment />
            )
        }
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const { height, left, top } = this.state;

        let total = this.getTotal(data, selected);
        let selectedData = this.getSelectedData(data, selected);

        return(
            <Paper className={classes.root} id='record-table-root-paper'>
                <RecordTableToolbar 
                    numSelected={selected.length}
                    selected={selected}
                    total={total}
                />
                {this.renderTable(this.props.tableData, data, order, orderBy, selected, rowsPerPage, page)}
                <TablePagination 
                    component='div'
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next'
                    }}
                    onChangePage={this.handlePageChange}
                    onChangeRowsPerPage={this.handleRowsPerPageChange}
                />
                <Grid container zeroMinWidth justify='center' alignItems='center' className={classes.download_button_and_search_bar_container}>
                    <Grid item xs={5} zeroMinWidth>
                        <DownloadButton height={height} left={left} top={top} selected={selectedData} />
                    </Grid>
                    <Grid item xs={7} zeroMinWidth>
                        <RecordSearchBar />
                    </Grid>
                </Grid>
                
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        tableData: state.tableData,
        postRecordResult: state.postRecordResult,
        uploadFileResult: state.uploadFile,
        readUploadedFileResult: state.readUploadedFile,
        deleteRecords: state.deleteRecords,
        recordSearchTerm: state.recordSearchTerm
    }
}

export default withStyles (RecordTableStyle) (connect (mapStateToProps, { receiveRecordData, readUploadedFile }) (RecordTable));