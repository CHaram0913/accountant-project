import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import history from './../../services/history';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField, Button, Typography, Grid } from 'material-ui';
import { SignUpStyle } from './../../styles';

import { createAccount, clearPostAccountResult } from './../../actions';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'email', 
        'password',
        'password2',
        'firstName'
    ];

    requiredFields.map(field => {
        if (!values[field]) {
            errors[field] = 'This field is required.'
        }
    });

    return errors;
};

class SignUpForm extends Component {
    async onSubmit(values) {
        if (values.password === values.password2) {
            await this.props.createAccount(values);

            if (this.props.postAccountResult.accountCreated) {
                this.props.clearPostAccountResult();
                history.push('/login')
            } else {
                console.log(this.props.postAccountResult.message)
            }
        } else {
            console.log('incorrect')
        }
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
                        Please Sign Up
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
                        <Field
                            label='Password Check'
                            placeholder='Please enter your password again'
                            name='password2'
                            type='password'
                            component={this.renderField}
                            classes={classes}
                        />
                        <Grid container zeroMinWidth>
                            <Grid item xs={6} zeroMinWidth>
                                <Field
                                    label='First Name'
                                    name='firstName'
                                    type='text'
                                    component={this.renderField}
                                    classes={classes}
                                />
                            </Grid>
                            <Grid item xs={6} zeroMinWidth>
                                <Field
                                    label='Last Name'
                                    name='lastName'
                                    type='text'
                                    component={this.renderField}
                                    classes={classes}
                                />
                            </Grid>
                        </Grid>
                        <Button 
                            variant='raised' 
                            color='secondary' 
                            className={classes.form_button}
                            type='submit'
                        >
                            Sign Up!
                        </Button>
                    </form>
                </Paper>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        postAccountResult: state.postAccountResult
    }
}

SignUpForm = connect(mapStateToProps, { createAccount, clearPostAccountResult }) (SignUpForm);

export default withStyles (SignUpStyle) (reduxForm ({
    validate,
    form: 'SignUpForm'
}) (SignUpForm)) ;