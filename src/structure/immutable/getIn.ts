import { Iterable } from 'immutable'
import plainGetIn from '../plain/getIn'

const getIn = (state: Record<string, any>, path: string[]): unknown =>
  Iterable.isIterable(state)
    ? state.getIn(path).toJS()
    : plainGetIn(state, path)

export default getIn