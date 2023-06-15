import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { PUSH, GO, PREFETCH, REPLACE, RouterMethod } from './routerMethods'
import {
  CALL_ROUTER_METHOD,
  CallRouterMethodAction,
  onLocationChanged,
  LocationChangeAction,
  LOCATION_CHANGE,
} from './actions'
import { Middleware } from 'redux'
import locationFromUrl from './utils/locationFromUrl'
import { LocationState, Structure } from './types'

export type RouterMethodsObject = { [key in RouterMethod]?: string }
export type RouterMiddlewareOpts = {
  methods?: RouterMethodsObject;
  reducerKey?: string;
}

/**
 * This middleware captures CALL_ROUTER_METHOD actions to redirect to the
 * Router singleton. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
const createRouterMiddleware = (structure: Structure) => (middlewareOpts: RouterMiddlewareOpts = {}): Middleware => {
  const { methods = {}, reducerKey = 'router' } = middlewareOpts
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routerMethodsArr: RouterMethod[] = [PUSH, PREFETCH, REPLACE]
  const resolvedMethods = routerMethodsArr.reduce(
    (acc: RouterMethodsObject, method: RouterMethod) => {
      acc[method] = methods[method] ? methods[method] : method
      return acc
    },
    { [GO]: GO }
  )

  return (store) => next => (action: CallRouterMethodAction | LocationChangeAction) => {
    const { type } = action
    const isServer = typeof window === 'undefined'
    /**
     * Ensure the Redux router state is synced with Next Router state
     * whenever an action is dispatched.
     */
    if (!isServer && type !== LOCATION_CHANGE) {
      const storeLocation = structure.getIn(store.getState(), [reducerKey, 'location']) as LocationState
      const url = pathname + '?' + searchParams.toString();
      if (url !== storeLocation.href) {
        next(onLocationChanged(locationFromUrl(url)))
      }
    }

    if (type === CALL_ROUTER_METHOD) {
      const { args, method: payloadMethod } = (action as CallRouterMethodAction).payload
      const method = resolvedMethods[payloadMethod]
      if (method === GO && !isServer && typeof args[0] === 'number') {
        router.forward();
      } else if (method && Object.prototype.hasOwnProperty.call(router, method)) {
        (router as any)[method](...args)
      } else if (process.env.NODE_ENV === 'development') {
        throw new Error(`Router method "${method}" for ${payloadMethod} action does not exist`)
      }
    } else {
      return next(action)
    }
  }
}

export default createRouterMiddleware
