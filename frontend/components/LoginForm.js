import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';


class LoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            password: null
        }
    }

    handleFormSubmit  = (e) => {
        e.preventDefault();
        this.props.submissionHandler({
            username: this.state.username,
            password: this.state.password
        })
    };


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    render() {
        return (<div>
            <form onSubmit={this.handleFormSubmit}>
                <h1> Log in ! </h1>
                <TextField
                    name="username"
                    label="Username"
                    defaultValue=""
                    onChange={this.handleInputChange}
                    margin="normal"/>

                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    onChange={this.handleInputChange}
                    defaultValue=""
                    margin="normal"/>

                <Button type='submit' color="primary" variant='contained'>
                    Primary
                </Button>
            </form>

            { /*language=SCSS*/}
            <style jsx>{`
          form {
            position: fixed;
            width: 300px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;

          }
        `}

            </style>
        </div>)
    }
}

export default LoginForm;
