import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PUSH, GO, PREFETCH, REPLACE } from './routerMethods';
import { CALL_ROUTER_METHOD, onLocationChanged, LOCATION_CHANGE, } from './actions';
import locationFromUrl from './utils/locationFromUrl';
var createRouterMiddleware = function (structure) { return function (middlewareOpts) {
    var _a;
    if (middlewareOpts === void 0) { middlewareOpts = {}; }
    var _b = middlewareOpts.methods, methods = _b === void 0 ? {} : _b, _c = middlewareOpts.reducerKey, reducerKey = _c === void 0 ? 'router' : _c;
    var router = useRouter();
    var pathname = usePathname();
    var searchParams = useSearchParams();
    var routerMethodsArr = [PUSH, PREFETCH, REPLACE];
    var resolvedMethods = routerMethodsArr.reduce(function (acc, method) {
        acc[method] = methods[method] ? methods[method] : method;
        return acc;
    }, (_a = {}, _a[GO] = GO, _a));
    return function (store) { return function (next) { return function (action) {
        var _a;
        var type = action.type;
        var isServer = typeof window === 'undefined';
        if (!isServer && type !== LOCATION_CHANGE) {
            var storeLocation = structure.getIn(store.getState(), [reducerKey, 'location']);
            var url = pathname + '?' + searchParams.toString();
            if (url !== storeLocation.href) {
                next(onLocationChanged(locationFromUrl(url)));
            }
        }
        if (type === CALL_ROUTER_METHOD) {
            var _b = action.payload, args = _b.args, payloadMethod = _b.method;
            var method = resolvedMethods[payloadMethod];
            if (method === GO && !isServer && typeof args[0] === 'number') {
                router.forward();
            }
            else if (method && Object.prototype.hasOwnProperty.call(router, method)) {
                (_a = router)[method].apply(_a, args);
            }
            else if (process.env.NODE_ENV === 'development') {
                throw new Error("Router method \"".concat(method, "\" for ").concat(payloadMethod, " action does not exist"));
            }
        }
        else {
            return next(action);
        }
    }; }; };
}; };
export default createRouterMiddleware;
