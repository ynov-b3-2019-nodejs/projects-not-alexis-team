import axios from 'axios';
import SettingsStore from '../utils/SettingsStore';
import {setCookie} from "./Cookies";

const http = axios.create();
http.defaults.headers.common['Accept'] = `application/json`;

// Add a request interceptor
http.interceptors.request.use(function (config) {
    if(token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default http;
