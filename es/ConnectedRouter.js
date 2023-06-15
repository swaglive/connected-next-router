import React, { useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { onLocationChanged } from './actions';
import locationFromUrl from './utils/locationFromUrl';
var createConnectedRouter = function (structure) {
    var getIn = structure.getIn;
    var ConnectedRouter = function (props) {
        var router = useRouter();
        var pathname = usePathname();
        var searchParams = useSearchParams();
        var _a = props.reducerKey, reducerKey = _a === void 0 ? 'router' : _a;
        var store = useStore();
        var ongoingRouteChanges = useRef(0);
        var isTimeTravelEnabled = useRef(true);
        var inTimeTraveling = useRef(false);
        function trackRouteComplete() {
            isTimeTravelEnabled.current = --ongoingRouteChanges.current <= 0;
        }
        function trackRouteStart() {
            isTimeTravelEnabled.current = ++ongoingRouteChanges.current <= 0;
        }
        useEffect(function () {
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
        useEffect(function () {
            function onRouteChangeFinish(url) {
                if (!inTimeTraveling.current) {
                    var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                    if (url !== storeLocation.href) {
                        store.dispatch(onLocationChanged(locationFromUrl(url)));
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
        return React.createElement(React.Fragment, null, props.children);
    };
    return ConnectedRouter;
};
export default createConnectedRouter;
