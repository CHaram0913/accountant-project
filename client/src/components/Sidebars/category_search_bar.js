import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField } from 'material-ui';
import { CategorySearchBarStyle } from './../../styles';

import { updateCategorySearchTerm } from './../../actions';

class CategorySearchBar extends Component {
    state = {
        term: ''
    }

    constructor(props) {
        super(props);

        this.handleCategorySearch = this.handleCategorySearch.bind(this);
    }

    handleCategorySearch = target => e => {
        this.setState({ term: e.target.value });
        this.props.updateCategorySearchTerm(e.target.value);
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Paper className={classes.root}>
                <TextField
                    id='search'
                    label='Search for Category'
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

export default withStyles (CategorySearchBarStyle) (connect (null, { updateCategorySearchTerm }) (CategorySearchBar));