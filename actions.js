"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerActions = exports.goForward = exports.goBack = exports.prefetch = exports.back = exports.go = exports.replace = exports.push = exports.CALL_ROUTER_METHOD = exports.onLocationChanged = exports.LOCATION_CHANGE = void 0;
var routerMethods_1 = require("./routerMethods");
exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
var onLocationChanged = function (location) { return ({
    type: exports.LOCATION_CHANGE,
    payload: {
        location: location,
    }
}); };
exports.onLocationChanged = onLocationChanged;
exports.CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
var push = function (url, options) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.PUSH,
        args: [url, options]
    }
}); };
exports.push = push;
var replace = function (url, options) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.REPLACE,
        args: [url, options]
    }
}); };
exports.replace = replace;
var go = function () { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.GO,
        args: []
    }
}); };
exports.go = go;
var back = function () { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.BACK,
        args: []
    }
}); };
exports.back = back;
var prefetch = function (url) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.PREFETCH,
        args: [url]
    }
}); };
exports.prefetch = prefetch;
var goBack = function () { return (0, exports.back)(); };
exports.goBack = goBack;
var goForward = function () { return (0, exports.go)(); };
exports.goForward = goForward;
exports.routerActions = { push: exports.push, replace: exports.replace, go: exports.go, goBack: exports.goBack, goForward: exports.goForward, prefetch: exports.prefetch };
