import { Iterable, fromJS } from 'immutable'
import getIn from './getIn'
import { Structure } from '../../types'

const structure: Structure = {
  fromJS: jsValue => fromJS(jsValue, (key, value) =>
    Iterable.isIndexed(value) ? value.toList() : value.toMap()),
  getIn,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  merge: (state, payload) => state.merge(payload),
}

export default structure