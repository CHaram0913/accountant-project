import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import AutoSuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import { withStyles } from 'material-ui/styles';
import { Paper, TextField, MenuItem } from 'material-ui';
import { AutoSuggestStyle } from './../../styles';

function renderInput(inputProps) {
    const { label, ...other } = inputProps;
    
    return (
        <TextField
            fullWidth
            margin='normal'
            label={label}
            inputProps={{ ...other }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component='div'>
            <Fragment>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight : 'bold', color : '#2554C7' }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight : 'normal' }}>
                            {part.text}
                        </strong>
                    );
                })}
            </Fragment>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}



class AutoSuggestComponent extends Component {
    state = {
        suggestions: []
    };

    constructor (props) {
        super(props);

        this.getSuggestions = this.getSuggestions.bind(this);
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
        this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
    
        return inputLength === 0
            ? []
            : this.props.suggestions.filter(suggestion => {
                const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
    
                if (keep) {
                    count += 1;
                }
    
                return keep;
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { classes, input, label, suggestions } = this.props;

        return (
            <AutoSuggest
                theme={{
                    container: classes.suggestion_container,
                    suggestionContainerOpen: classes.suggestion_container_open,
                    suggestion: classes.suggestion
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    classes,
                    value: input.value,
                    onChange: input.onChange,
                    label
                }}
            />
        );
    }
}

export default withStyles (AutoSuggestStyle) (AutoSuggestComponent) ;