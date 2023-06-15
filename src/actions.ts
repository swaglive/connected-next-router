import { UrlObject } from 'url'
import { PUSH, REPLACE, GO, BACK, PREFETCH } from './routerMethods'
import { LocationState, RouterState } from './types'

type Url = UrlObject | string

/**
 * This action type will be dispatched after Router's history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

export type LocationChangeAction = {
  type: typeof LOCATION_CHANGE;
  payload: RouterState;
}

export const onLocationChanged = (location: LocationState): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  payload: {
    location,
  }
})

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
export const CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD'

export type CallRouterMethodPushPayload = {
  type: typeof CALL_ROUTER_METHOD;
  payload: {
    method: typeof PUSH;
    args: [Url, Url?, any?];
  };
}

export type CallRouterMethodReplacePayload = {
  type: typeof CALL_ROUTER_METHOD;
  payload: {
    method: typeof REPLACE;
    args: [Url, Url?, any?];
  };
}

export type CallRouterMethodGoPayload = {
  type: typeof CALL_ROUTER_METHOD;
  payload: {
    method: typeof GO;
    args: [];
  };
}

export type CallRouterMethodBackPayload = {
  type: typeof CALL_ROUTER_METHOD;
  payload: {
    method: typeof BACK;
    args: [];
  };
}

export type CallRouterMethodPrefetchPayload = {
  type: typeof CALL_ROUTER_METHOD;
  payload: {
    method: typeof PREFETCH;
    args: [string];
  };
}

export type CallRouterMethodAction =
  | CallRouterMethodPushPayload
  | CallRouterMethodReplacePayload
  | CallRouterMethodGoPayload
  | CallRouterMethodBackPayload
  | CallRouterMethodPrefetchPayload

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = (url: Url, options?: any): CallRouterMethodPushPayload => ({
  type: CALL_ROUTER_METHOD,
  payload: {
    method: PUSH,
    args: [url, options]
  }
})

export const replace = (url: Url, options?: any): CallRouterMethodReplacePayload => ({
  type: CALL_ROUTER_METHOD,
  payload: {
    method: REPLACE,
    args: [url, options]
  }
})

export const go = (): CallRouterMethodGoPayload => ({
  type: CALL_ROUTER_METHOD,
  payload: {
    method: GO,
    args: []
  }
})

export const back = (): CallRouterMethodBackPayload => ({
  type: CALL_ROUTER_METHOD,
  payload: {
    method: BACK,
    args: []
  }
})

export const prefetch = (url: string): CallRouterMethodPrefetchPayload => ({
  type: CALL_ROUTER_METHOD,
  payload: {
    method: PREFETCH,
    args: [url]
  }
})

export const goBack = (): CallRouterMethodBackPayload => back()
export const goForward = (): CallRouterMethodGoPayload => go()

export const routerActions = { push, replace, go, goBack, goForward, prefetch }
