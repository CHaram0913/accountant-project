import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField, Button, Typography } from 'material-ui';
import { LoginStyle } from './../../styles';

import { logInToAccount } from './../../actions';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'email', 
        'password'
    ];

    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'This field is required.'
        }
    });

    return errors;
};

class LogInForm extends Component {
    async onSubmit(values) {
        this.props.logInToAccount(values);
    }

    renderField(field) {
        return (
            <Fragment>
                <TextField
                    {...field.input}
                    type={field.type}
                    label={field.label}
                    className={field.classes.text_field}
                    fullWidth
                    margin='normal'
                />
            </Fragment>
        )
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <Fragment>
                <Paper className={classes.root}>
                    <Typography align='center' variant='display2'>
                        Please Log In
                    </Typography>
                    <form 
                        className={classes.container} 
                        noValidate 
                        autoComplete="off"
                        onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    >
                        <Field
                            label='Email'
                            name='email'
                            type='email'
                            component={this.renderField}
                            classes={classes}
                        />
                        <Field
                            label='Password'
                            name='password'
                            type='password'
                            component={this.renderField}
                            classes={classes}
                        />
                        <Button 
                            variant='raised' 
                            color='primary' 
                            className={classes.form_button}
                            type='submit'
                        >
                            Log in!
                        </Button>
                    </form>
                </Paper>
            </Fragment>
        )
    }
}

LogInForm = connect(null, { logInToAccount }) (LogInForm);

export default withStyles (LoginStyle) (reduxForm ({
    validate,
    form: 'LogInForm'
}) (LogInForm)) ;