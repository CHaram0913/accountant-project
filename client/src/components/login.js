import React, { Component, Fragment } from 'react';

import { withStyles } from 'material-ui/styles';
import { Paper, TextField } from 'material-ui';
import { LoginStyles } from './../styles';

class LogIn extends Component {
    state = {
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = target => event => {
        this.setState({[target]: event.target.value});
    };

    handleSubmit = () => async e => {
        console.log('submit')
    }

    render() {
        const { classes } = this.props;
        console.log(this.state)
        return (
            <Fragment>
                <Paper className={classes.root}>
                    <form 
                        className={classes.container} 
                        noValidate 
                        autoComplete="off"
                        onSubmit={this.handleSubmit()}
                    >
                        <TextField
                            id='name'
                            label='Email'
                            className={classes.text_field}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            fullWidth
                            margin='normal'
                        >
                        </TextField>
                        <TextField
                            id='password'
                            label='Password'
                            type='password'
                            className={classes.text_field}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                            margin='normal'
                        >
                        </TextField>
                    </form>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles (LoginStyles) (LogIn);