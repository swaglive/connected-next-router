"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigation_1 = require("next/navigation");
var routerMethods_1 = require("./routerMethods");
var actions_1 = require("./actions");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var createRouterMiddleware = function (structure) { return function (middlewareOpts) {
    var _a;
    if (middlewareOpts === void 0) { middlewareOpts = {}; }
    var _b = middlewareOpts.methods, methods = _b === void 0 ? {} : _b, _c = middlewareOpts.reducerKey, reducerKey = _c === void 0 ? 'router' : _c;
    var router = (0, navigation_1.useRouter)();
    var pathname = (0, navigation_1.usePathname)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var routerMethodsArr = [routerMethods_1.PUSH, routerMethods_1.PREFETCH, routerMethods_1.REPLACE];
    var resolvedMethods = routerMethodsArr.reduce(function (acc, method) {
        acc[method] = methods[method] ? methods[method] : method;
        return acc;
    }, (_a = {}, _a[routerMethods_1.GO] = routerMethods_1.GO, _a));
    return function (store) { return function (next) { return function (action) {
        var _a;
        var type = action.type;
        var isServer = typeof window === 'undefined';
        if (!isServer && type !== actions_1.LOCATION_CHANGE) {
            var storeLocation = structure.getIn(store.getState(), [reducerKey, 'location']);
            var url = pathname + '?' + searchParams.toString();
            if (url !== storeLocation.href) {
                next((0, actions_1.onLocationChanged)((0, locationFromUrl_1.default)(url)));
            }
        }
        if (type === actions_1.CALL_ROUTER_METHOD) {
            var _b = action.payload, args = _b.args, payloadMethod = _b.method;
            var method = resolvedMethods[payloadMethod];
            if (method === routerMethods_1.GO && !isServer && typeof args[0] === 'number') {
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
exports.default = createRouterMiddleware;
