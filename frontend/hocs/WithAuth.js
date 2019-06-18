import React from 'react'
import SettingsStore from '../utils/SettingsStore';
import axios from 'axios';

const WithAuth = Page => {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        static getInitialProps = async context => {
            const pageProps = await Page.getInitialProps(context);
            const token = new SettingsStore(context.req).token;
            const httpConfig = {};
            if(token) {
                httpConfig.headers = {
                    'Authorization' : `Bearer ${token}`
                };
            }



            // Return props.
            return { ...pageProps, token, httpConfig }

        };

        render() {
            return <Page {...this.props} />
        }
    };
};

export default WithAuth;
