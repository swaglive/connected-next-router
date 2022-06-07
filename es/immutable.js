import immutableStructure from './structure/immutable';
import createConnectedRouter from './ConnectedRouter';
import createRouterReducer from './reducer';
import createInitialRouterState from './utils/createInitialRouterState';
import _createRouterMiddleware from './middleware';
export { LOCATION_CHANGE, CALL_ROUTER_METHOD, routerActions, push, replace, go, goBack, goForward, prefetch, } from './actions';
export { default as routerMethods } from './routerMethods';
export var initialRouterState = createInitialRouterState(immutableStructure);
export var routerReducer = createRouterReducer(immutableStructure);
export var ConnectedRouter = createConnectedRouter(immutableStructure);
export var createRouterMiddleware = _createRouterMiddleware(immutableStructure);
