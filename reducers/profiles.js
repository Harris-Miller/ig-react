import immutable from 'immutable';
import { ADD_PROFILE } from '../actions/profiles';

export default (state = new immutable.List(), action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return state.push(immutable.fromJS(action.data));
    default:
      return state;
  }
}
