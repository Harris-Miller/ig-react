import immutable from 'immutable';
import { RESET_FEED, ADD_TO_FEED } from '../actions/feed';

export default (state = new immutable.List(), action) => {
  switch (action.type) {
    case RESET_FEED:
      return immutable.fromJS(action.data);
    default:
      return state;
  }
}
