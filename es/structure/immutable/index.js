import { Iterable, fromJS } from 'immutable';
import getIn from './getIn';
var structure = {
    fromJS: function (jsValue) { return fromJS(jsValue, function (key, value) {
        return Iterable.isIndexed(value) ? value.toList() : value.toMap();
    }); },
    getIn: getIn,
    merge: function (state, payload) { return state.merge(payload); },
};
export default structure;
