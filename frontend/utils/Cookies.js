import Cookies from 'universal-cookie'

export const setCookie = (key, value) => {
    if (process.browser) {
        const cookies = new Cookies();
        cookies.set(key, value, {
            path: "/"
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        const cookies = new Cookies();
        cookies.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser ?
        getCookieFromBrowser(key) :
        getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    console.log('grabbing key from browser');
    const cookies = new Cookies();
    return cookies.get(key);
};

const getCookieFromServer = (key, req) => {
    console.log('grabbing key from server');

    if (!req.headers.cookie) {
        return undefined;
    }


    const cookies = new Cookies(req.headers.cookie);
    return cookies.get(key);
};
