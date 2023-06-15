/// <reference types="node" />
import { UrlObject } from 'url';
import { PUSH, REPLACE, GO, BACK, PREFETCH } from './routerMethods';
import { LocationState, RouterState } from './types';
declare type Url = UrlObject | string;
export declare const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
export declare type LocationChangeAction = {
    type: typeof LOCATION_CHANGE;
    payload: RouterState;
};
export declare const onLocationChanged: (location: LocationState) => LocationChangeAction;
export declare const CALL_ROUTER_METHOD = "@@router/CALL_ROUTER_METHOD";
export declare type CallRouterMethodPushPayload = {
    type: typeof CALL_ROUTER_METHOD;
    payload: {
        method: typeof PUSH;
        args: [Url, Url?, any?];
    };
};
export declare type CallRouterMethodReplacePayload = {
    type: typeof CALL_ROUTER_METHOD;
    payload: {
        method: typeof REPLACE;
        args: [Url, Url?, any?];
    };
};
export declare type CallRouterMethodGoPayload = {
    type: typeof CALL_ROUTER_METHOD;
    payload: {
        method: typeof GO;
        args: [];
    };
};
export declare type CallRouterMethodBackPayload = {
    type: typeof CALL_ROUTER_METHOD;
    payload: {
        method: typeof BACK;
        args: [];
    };
};
export declare type CallRouterMethodPrefetchPayload = {
    type: typeof CALL_ROUTER_METHOD;
    payload: {
        method: typeof PREFETCH;
        args: [string];
    };
};
export declare type CallRouterMethodAction = CallRouterMethodPushPayload | CallRouterMethodReplacePayload | CallRouterMethodGoPayload | CallRouterMethodBackPayload | CallRouterMethodPrefetchPayload;
export declare const push: (url: Url, options?: any) => CallRouterMethodPushPayload;
export declare const replace: (url: Url, options?: any) => CallRouterMethodReplacePayload;
export declare const go: () => CallRouterMethodGoPayload;
export declare const back: () => CallRouterMethodBackPayload;
export declare const prefetch: (url: string) => CallRouterMethodPrefetchPayload;
export declare const goBack: () => CallRouterMethodBackPayload;
export declare const goForward: () => CallRouterMethodGoPayload;
export declare const routerActions: {
    push: (url: Url, options?: any) => CallRouterMethodPushPayload;
    replace: (url: Url, options?: any) => CallRouterMethodReplacePayload;
    go: () => CallRouterMethodGoPayload;
    goBack: () => CallRouterMethodBackPayload;
    goForward: () => CallRouterMethodGoPayload;
    prefetch: (url: string) => CallRouterMethodPrefetchPayload;
};
export {};
