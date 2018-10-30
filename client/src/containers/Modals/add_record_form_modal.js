import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import { Paper, Typography, TextField, Checkbox, Select, MenuItem, Grid, Button } from 'material-ui';

import { addTransactionRecord, handleModal, clearPostRecordResult, getSuggestions } from './../../actions';

import { AutoSuggestComponent } from './../../components';
import { RecordFormModalStyle } from './../../styles';

import { intervalArray, normalizeCalendar } from './../../resources';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'date', 
        'category',
        'subCategory',
        'amount',
        'payee'
    ];

    requiredFields.map(field => {
        if (!values[field] && values[field] !== 0) {
            errors[field] = 'This field is required.'
        }
    });

    return errors;
};

class RecordModal extends Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
    }

    async componentWillMount() {
        await this.props.getSuggestions();
    }
    
    renderCalenderField(field) {
        return (
            <Fragment>
                <Grid container justify='flex-start' alignItems='center' className={field.classes.field_element_container}>
                    <Grid item xs={4}>
                        <Typography variant='title'> {field.label} </Typography>
                    </Grid>

                    <Grid item xs={8} zeroMinWidth>
                        <TextField
                            {...field.input}
                            type='date'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

    renderDropDownField(field) {
        return (
            <Fragment>
                <Grid container justify='flex-start' alignItems='center' className={field.classes.field_element_container}>
                    <Grid item xs={4}>
                        <Typography variant='title'> {field.label} </Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <Select
                            onChange={(event, index, value) => field.input.onChange(value)}
                            {...field.input}
                            className={field.classes.select_component}
                        >
                            {intervalArray.map((interval, index) => (
                                <MenuItem key={index} value={index}>{interval}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

    renderField(field) {
        return (
            <Fragment>
                <TextField
                    type={field.type}
                    label={field.label}
                    multiline={field.multiline}
                    {...field.input}
                    margin='normal'
                    fullWidth
                />
                {field.meta.error}
            </Fragment>
        )
    }

    renderCheckBoxField(field) {
        return (
            <Fragment>
                <Grid container justify='flex-start' alignItems='center' zeroMinWidth className={field.classes.checkbox_field}>
                    <Grid item xs={8} zeroMinWidth>
                        <Typography variant='title'> {field.label} </Typography>
                    </Grid>

                    <Grid item xs={2} zeroMinWidth>
                        <Checkbox
                            checked={field.input.value ? true : false}
                            onChange={field.input.onChange}
                            {...field.input}
                        />
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

    async onSubmit(values) {
        await this.props.addTransactionRecord(values);

        if (this.props.postRecordResult === 'Succesful') {
            this.props.handleModal(false);
            this.props.clearPostRecordResult();
        }
    }

    closeModal() {
        this.props.handleModal(false);
    }

    renderSuggestions(suggestions) {
        if (!_.isEmpty(suggestions) && suggestions.success) {
            return suggestions.data;
        } else {
            return {
                category: [{ label: 'Default' }],
                payee: [{ label: 'Default' }]
            };
        }
    }

    render() {
        const { classes, handleSubmit, suggestions } = this.props;

        return (
            <Paper className={classes.root}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label='Date'
                        name='date'
                        component={this.renderCalenderField}
                        classes={classes}
                        normalize={normalizeCalendar}
                    />
                    <Field
                        label='Interval'
                        name='category'
                        component={this.renderDropDownField}
                        classes={classes}
                    >
                    </Field>
                    <Field
                        label='Category'
                        name='subCategory'
                        component={AutoSuggestComponent}
                        suggestions={this.renderSuggestions(suggestions).category}
                    />
                    <Grid container justify='space-between' alignItems='center' className={classes.checkbox_container} zeroMinWidth>
                        <Grid item xs={4} zeroMinWidth>
                            <Field
                                label='Income?'
                                name='income'
                                component={this.renderCheckBoxField}
                                classes={classes}
                            />
                        </Grid>
                        <Grid item xs={8} zeroMinWidth>
                            <Field
                                label='Future Notification'
                                name='notification'
                                component={this.renderCheckBoxField}
                                classes={classes}
                            />
                        </Grid>
                    </Grid>
                    <Field
                        label='Amount'
                        name='amount'
                        component={this.renderField}
                        type='number'
                        multiline={false}
                    />
                    <Field
                        label='Payee'
                        name='payee'
                        component={AutoSuggestComponent}
                        suggestions={this.renderSuggestions(suggestions).payee}
                    />
                    <Field
                        label='Memo'
                        name='memo'
                        component={this.renderField}
                        type='text'
                        multiline={true}
                    />
                    <Grid container className={classes.button_container}>
                        <Grid item xs={6}>
                            <Button 
                                variant='raised' 
                                color='primary' 
                                className={classes.form_button}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                                variant="raised" 
                                color="secondary" 
                                className={classes.form_button}
                                onClick={this.closeModal}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        suggestions: state.suggestions,
        postRecordResult: state.postRecordResult,
        initialValues: state.initialForm
    }
}

RecordModal = reduxForm ({
    validate,
    form: 'NewRecordForm'
}) (RecordModal);

export default withStyles (RecordFormModalStyle) (connect(mapStateToProps, {
    addTransactionRecord,
    handleModal,
    clearPostRecordResult,
    getSuggestions
}) (RecordModal)) ;