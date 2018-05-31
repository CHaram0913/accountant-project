import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import history from './../../services/history';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField, Button, Typography, Grid } from 'material-ui';
import { LoginStyle } from './../../styles';

import { logInToAccount, clearPostLogInResult } from './../../actions';

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
        await this.props.logInToAccount(values);

        if (this.props.postLogInResult.accountLoggedIn) {
            this.props.clearPostLogInResult();
            history.push('/')
        } else {
            console.log(this.props.postLogInResult.message)
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
                        <Grid container alignItems='center' className={classes.button_and_link_container}>
                            <Grid item xs={6}>
                                <Link to={'/create_account'}>
                                    <Typography variant='title'>Create Account!</Typography>
                                </Link>
                            </Grid>

                            <Grid item xs={6}>
                                <Button 
                                    variant='raised' 
                                    color='primary' 
                                    className={classes.form_button}
                                    type='submit'
                                >
                                    Log in!
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        postLogInResult: state.postLogInResult
    }
}

LogInForm = connect(mapStateToProps, { logInToAccount, clearPostLogInResult }) (LogInForm);

export default withStyles (LoginStyle) (reduxForm ({
    validate,
    form: 'LogInForm'
}) (LogInForm)) ;