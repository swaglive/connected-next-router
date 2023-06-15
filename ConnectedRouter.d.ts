import React from 'react';
import { Structure } from './types';
declare type ConnectedRouterProps = {
    children?: React.ReactNode;
    reducerKey?: string;
};
declare const createConnectedRouter: (structure: Structure) => React.FC<ConnectedRouterProps>;
export default createConnectedRouter;
