import axios from 'axios';
import LoginForm from '../components/LoginForm'
import http from '../utils/Axios';
import SettingsStore from '../utils/SettingsStore';


import React from 'react'

class Login extends React.Component {
    render() {
        return <LoginForm submissionHandler={this.handleLogin} />
    }

    handleLogin = async (loginFormPayload) => {
        const loginResponse = await http.post('http://localhost:3000/login', loginFormPayload);
        if(loginResponse.data && loginResponse.data.token) {
            new SettingsStore(this.props.req).token = loginResponse.data.token;
        }
    }
}
export default Login;
