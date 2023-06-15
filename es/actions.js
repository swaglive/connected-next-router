import { PUSH, REPLACE, GO, BACK, PREFETCH } from './routerMethods';
export var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export var onLocationChanged = function (location) { return ({
    type: LOCATION_CHANGE,
    payload: {
        location: location,
    }
}); };
export var CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
export var push = function (url, options) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: PUSH,
        args: [url, options]
    }
}); };
export var replace = function (url, options) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: REPLACE,
        args: [url, options]
    }
}); };
export var go = function () { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: GO,
        args: []
    }
}); };
export var back = function () { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: BACK,
        args: []
    }
}); };
export var prefetch = function (url) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: PREFETCH,
        args: [url]
    }
}); };
export var goBack = function () { return back(); };
export var goForward = function () { return go(); };
export var routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward, prefetch: prefetch };
