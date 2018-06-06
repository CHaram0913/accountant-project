import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField } from 'material-ui';
import { RecordSearchBarStyle } from './../../styles';

import { updateRecordSearchTerm } from './../../actions';

class RecordSearchBar extends Component {
    state = {
        term: ''
    }

    constructor(props) {
        super(props);

        this.handleCategorySearch = this.handleCategorySearch.bind(this);
    }

    handleCategorySearch = target => e => {
        this.setState({ term: e.target.value });
        this.props.updateRecordSearchTerm(e.target.value);
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Paper className={classes.root}>
                <TextField
                    id='search'
                    label='Search for Records'
                    type='search'
                    className={classes.category_search_textfield}
                    margin='normal'
                    value={this.state.term}
                    onChange={this.handleCategorySearch()}
                />
            </Paper>
        )
    }
}

export default withStyles (RecordSearchBarStyle) (connect (null, { updateRecordSearchTerm }) (RecordSearchBar));