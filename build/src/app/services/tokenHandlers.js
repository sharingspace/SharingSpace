var token_string_id = 'session_token';
var saveToken = function (input) {
    createCookie(token_string_id, input, 7);
};
var getToken = function () { return readCookie(token_string_id); };
var deleteToken = function () {
    eraseCookie(token_string_id);
};
var createCookie = function (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = '';
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};
var readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
var eraseCookie = function (name) {
    createCookie(name, '', -1);
};
var checkForToken = function () { return !!readCookie(token_string_id); };
export { saveToken, deleteToken, checkForToken, getToken, };
//# sourceMappingURL=tokenHandlers.js.map