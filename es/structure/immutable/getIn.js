import { Iterable } from 'immutable';
import plainGetIn from '../plain/getIn';
var getIn = function (state, path) {
    return Iterable.isIterable(state)
        ? state.getIn(path).toJS()
        : plainGetIn(state, path);
};
export default getIn;
