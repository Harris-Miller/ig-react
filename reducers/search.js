import immutable from 'immutable';
import { CLEAR_SEARCH, SET_SEARCH } from '../actions/search';

export default (state = new immutable.List(), action) => {
  switch (action.type) {
    case SET_SEARCH:
      return immutable.fromJS(action.data);
    case CLEAR_SEARCH:
      return new immutable.List();
    default:
      return state;
  }
}
