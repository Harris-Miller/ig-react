import { combineReducers } from 'redux';
import auth from './auth';
import feed from './feed';
import search from './search';
import profiles from './profiles';
import posts from './posts';

export default combineReducers({
  auth,
  feed,
  search,
  profiles,
  posts
});
