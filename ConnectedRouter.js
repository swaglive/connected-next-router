"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var navigation_1 = require("next/navigation");
var actions_1 = require("./actions");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var createConnectedRouter = function (structure) {
    var getIn = structure.getIn;
    var ConnectedRouter = function (props) {
        var router = (0, navigation_1.useRouter)();
        var pathname = (0, navigation_1.usePathname)();
        var searchParams = (0, navigation_1.useSearchParams)();
        var _a = props.reducerKey, reducerKey = _a === void 0 ? 'router' : _a;
        var store = (0, react_redux_1.useStore)();
        var ongoingRouteChanges = (0, react_1.useRef)(0);
        var isTimeTravelEnabled = (0, react_1.useRef)(true);
        var inTimeTraveling = (0, react_1.useRef)(false);
        function trackRouteComplete() {
            isTimeTravelEnabled.current = --ongoingRouteChanges.current <= 0;
        }
        function trackRouteStart() {
            isTimeTravelEnabled.current = ++ongoingRouteChanges.current <= 0;
        }
        (0, react_1.useEffect)(function () {
            function listenStoreChanges() {
                if (!isTimeTravelEnabled.current) {
                    return;
                }
                var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                var pathnameInStore = storeLocation.pathname, searchInStore = storeLocation.search, hashInStore = storeLocation.hash;
                var pathnameInHistory = pathname;
                var searchInHistory = "?".concat(searchParams);
                var hashInHistory = '';
                var locationMismatch = pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory;
                if (locationMismatch) {
                    var as = "".concat(pathnameInStore).concat(searchInStore).concat(hashInStore);
                    inTimeTraveling.current = true;
                    router.replace(as);
                }
            }
            var unsubscribeStore = store.subscribe(listenStoreChanges);
            return unsubscribeStore;
        }, [router, pathname, searchParams, store, reducerKey]);
        (0, react_1.useEffect)(function () {
            function onRouteChangeFinish(url) {
                if (!inTimeTraveling.current) {
                    var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                    if (url !== storeLocation.href) {
                        store.dispatch((0, actions_1.onLocationChanged)((0, locationFromUrl_1.default)(url)));
                    }
                }
                else {
                    inTimeTraveling.current = false;
                }
                trackRouteComplete();
            }
            try {
                var url = pathname + '?' + searchParams.toString();
                trackRouteStart();
                onRouteChangeFinish(url);
            }
            catch (e) {
                trackRouteComplete();
            }
        }, [pathname, searchParams,]);
        return react_1.default.createElement(react_1.default.Fragment, null, props.children);
    };
    return ConnectedRouter;
};
exports.default = createConnectedRouter;
