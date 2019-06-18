import React from 'react'
import {getCookie, setCookie} from './Cookies'

class SettingsStore {

    constructor(req) {
        this.req = req;
    }

    _token = null;
    set token (str) {
        this._token = str;
        setCookie('token', str);
    }

    get token () {
        return this._token || getCookie('token', this.req)
    }
}
export default SettingsStore;
