import axios from 'axios';

const http = axios.create();
http.defaults.headers.common['Accept'] = `application/json`;

export default http;
