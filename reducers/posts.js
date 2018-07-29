import immutable from 'immutable';
import { ADD_POSTS, CLEAR_POSTS } from '../actions/posts';

export default (state = new immutable.Map(), action) => {
  switch (action.type) {
    case ADD_POSTS:
      return state.set(action.userId, (state.get(action.userId) || new immutable.List()).concat(immutable.fromJS(action.data)));
    case CLEAR_POSTS:
      return state.clear(action.userId);
    default:
      return state;
  }
}
