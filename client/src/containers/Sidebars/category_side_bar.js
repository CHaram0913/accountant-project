import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';
import { CategorySideBarStyle } from './../../styles';

import { CategoryBlock } from './../../components';
import { CategorySearchBar } from './../../components';

import { receiveSideBarData } from './../../actions';

const lengthCut = (recordArray) => (recordArray.length > 5 ? 5 : recordArray.length)

class CategorySideBar extends Component {
    async componentWillMount() {
        await this.props.receiveSideBarData(this.props.categorySearchTerm.term);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.postRecordResult !== this.props.postRecordResult && this.props.postRecordResult === 'Succesful') {
            await this.props.receiveSideBarData(this.props.categorySearchTerm.term);
        } else if (prevProps.readUploadedFileResult !== this.props.readUploadedFileResult && this.props.readUploadedFileResult.success) {
            await this.props.receiveSideBarData(this.props.categorySearchTerm.term);
        } else if (prevProps.deleteRecords !== this.props.deleteRecords && this.props.deleteRecords.success) {
            await this.props.receiveSideBarData(this.props.categorySearchTerm.term);
        } else if (prevProps.categorySearchTerm !== this.props.categorySearchTerm) {
            await this.props.receiveSideBarData(this.props.categorySearchTerm.term);
        }
    }

    renderSideBar(recordState) {
        if (!_.isEmpty(recordState) && recordState.success) {
            let length = lengthCut(recordState.data);
            let records = [];
            for (let i = 0; i < length; i++){
                records.push(recordState.data[i]);
            }

            return (
                <Paper>
                    {records.map((record, index) => (
                        <CategoryBlock key={index} record={record} />
                    ))}
                </Paper>
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
                <CategorySearchBar />
                {this.renderSideBar(this.props.sideBarData)}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        sideBarData: state.sideBarData,
        postRecordResult: state.postRecordResult,
        readUploadedFileResult: state.readUploadedFile,
        deleteRecords: state.deleteRecords,
        categorySearchTerm: state.categorySearchTerm
    }
}

export default withStyles (CategorySideBarStyle) (connect (mapStateToProps, { receiveSideBarData }) (CategorySideBar));