import axios from 'axios';
import SettingsStore from '../utils/SettingsStore';

const WithAuth = Page => {
    const WithAxios = props => <Page {...props} />;



    WithAuth.getInitialProps = async context => {
        const pageProps = Page.getInitialProps && await Page.getInitialProps(context);
        const token = new SettingsStore('token',context.req);
        // Return props.
        return { ...pageProps, token }
    };


    return WithAuth;
};

export default WithAuth;
