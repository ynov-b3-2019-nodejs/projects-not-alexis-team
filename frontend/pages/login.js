import http from '../utils/Axios';
import LoginForm from '../components/LoginForm'
import SettingsStore from '../utils/SettingsStore';
import Router from 'next/router';
import WithAuth from '../hocs/WithAuth'


import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <LoginForm submissionHandler={this.handleLogin} />
    }

    static getInitialProps = async () => {
        return {};
    };



    handleLogin = async (loginFormPayload) => {
        const loginResponse = await http.post('http://localhost:3000/login', loginFormPayload, this.props.httpConfig );
        if(loginResponse.data && loginResponse.data.token) {
            new SettingsStore(this.props.req).token = loginResponse.data.token;
            Router.push('/chat');
        }

    }
}
export default WithAuth(Login);
