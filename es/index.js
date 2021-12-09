import plainStructure from './structure/plain';
import createConnectedRouter from './ConnectedRouter';
import createRouterReducer from './reducer';
import createInitialRouterState from './utils/createInitialRouterState';
export { LOCATION_CHANGE, CALL_ROUTER_METHOD, routerActions, push, replace, go, goBack, goForward, prefetch, } from './actions';
export { default as routerMethods } from './routerMethods';
import _createRouterMiddleware from './middleware';
export var initialRouterState = createInitialRouterState(plainStructure);
export var routerReducer = createRouterReducer(plainStructure);
export var ConnectedRouter = createConnectedRouter(plainStructure);
export var createRouterMiddleware = _createRouterMiddleware(plainStructure);
