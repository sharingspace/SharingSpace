import { checkForToken, getToken } from './tokenHandlers';
import config from 'config';

const rootApiCall = (path, method, body) => {
    return new Promise((resolve) => {

        const req = new XMLHttpRequest();

        ////////////////////////////////////////////////////////////////////////////////
        // handle responses here
        req.onreadystatechange = () => {
            if (req.readyState !== 4) {
                // handle other states here
                return;
            }
            const logData = {
                status: req.status,
                headers: undefined,
                resText: req.responseText,
                fullReq: req
            };

            console.log('respose -------- ', logData);

            const formattedRes = {
                ok: false,
                status: req.status,
                json: undefined
            };
            // extract json from response
            if (req.response && req.getResponseHeader('Content-Type') === 'application/json') {
                formattedRes.json = JSON.parse(req.responseText);
            }
            if (req.status >= 200 && req.status < 400) {
                formattedRes.ok = true;
                // console.log('=== formattedRes', formattedRes)
                // cookie saved, finally return response
                resolve(formattedRes);
            } else {
                console.log('XMLHttpRequest error', req.status, req);
                // resolve through then each time
                resolve(formattedRes);
            }
        };

        ////////////////////////////////////////////////////////////////////////////////
        // handle requests here

        const url = [config.apiServer, path].join('/');
        req.open(method, url);

        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');

        let sendBody;
        if ( typeof body === 'object' ) {
            sendBody = JSON.stringify(body);
        }

        let attachToken = true;
        if(!checkForToken()) {
            attachToken = false
        };
        if(path === 'auth/token/create/') {
            attachToken = false;
        };

        if(attachToken) {
          req.setRequestHeader('Authorization', 'Token ' + getToken());
        }

        const logRequest = {
            token: getToken(),
            url: url,
            body: sendBody,
            fullReq: req
        };
        console.log('===== - - -  request', logRequest, body);
        req.send(sendBody);
    });
};
const querify = (obj = {}, needsEncoding = false) => {
    const encode = (value) => needsEncoding ? encodeURIComponent(value) : value;
    const keys = Object.keys(obj);
    return keys.length
        ? '?' + keys
        .filter((key) => obj[key] !== undefined)
        .map((key) => encode(key) + '=' + encode(obj[key])).join('&')
        : '';
};
const apicalls = {
    get: (path, ...querifyArgs) => rootApiCall(path + querify(...querifyArgs), 'GET', undefined),
    post: (path, body) => rootApiCall(path, 'POST', body),
    put: (path, body) => rootApiCall(path, 'PUT', body),
    delete: (path, body) => rootApiCall(path, 'DELETE', body)
};

export default {
    apicalls: apicalls
}