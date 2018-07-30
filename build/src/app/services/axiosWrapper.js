import { checkForToken, getToken } from './tokenHandlers';
import config from 'config';
var rootApiCall = function (path, method, body) {
    return new Promise(function (resolve) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState !== 4) {
                return;
            }
            var logData = {
                status: req.status,
                headers: undefined,
                resText: req.responseText,
                fullReq: req
            };
            console.log('respose -------- ', logData);
            var formattedRes = {
                ok: false,
                status: req.status,
                json: undefined
            };
            if (req.response && req.getResponseHeader('Content-Type') === 'application/json') {
                formattedRes.json = JSON.parse(req.responseText);
            }
            if (req.status >= 200 && req.status < 400) {
                formattedRes.ok = true;
                resolve(formattedRes);
            }
            else {
                console.log('XMLHttpRequest error', req.status, req);
                resolve(formattedRes);
            }
        };
        var url = [config.apiServer, path].join('/');
        req.open(method, url);
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        var sendBody;
        if (typeof body === 'object') {
            sendBody = JSON.stringify(body);
        }
        var attachToken = true;
        if (!checkForToken()) {
            attachToken = false;
        }
        ;
        if (path === 'auth/token/create/') {
            attachToken = false;
        }
        ;
        if (attachToken) {
            req.setRequestHeader('Authorization', 'Token ' + getToken());
        }
        var logRequest = {
            token: getToken(),
            url: url,
            body: sendBody,
            fullReq: req
        };
        console.log('===== - - -  request', logRequest, body);
        req.send(sendBody);
    });
};
var querify = function (obj, needsEncoding) {
    if (obj === void 0) { obj = {}; }
    if (needsEncoding === void 0) { needsEncoding = false; }
    var encode = function (value) { return needsEncoding ? encodeURIComponent(value) : value; };
    var keys = Object.keys(obj);
    return keys.length
        ? '?' + keys
            .filter(function (key) { return obj[key] !== undefined; })
            .map(function (key) { return encode(key) + '=' + encode(obj[key]); }).join('&')
        : '';
};
var apicalls = {
    get: function (path) {
        var querifyArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            querifyArgs[_i - 1] = arguments[_i];
        }
        return rootApiCall(path + querify.apply(void 0, querifyArgs), 'GET', undefined);
    },
    post: function (path, body) { return rootApiCall(path, 'POST', body); },
    put: function (path, body) { return rootApiCall(path, 'PUT', body); },
    delete: function (path, body) { return rootApiCall(path, 'DELETE', body); }
};
export default {
    apicalls: apicalls
};
//# sourceMappingURL=axiosWrapper.js.map