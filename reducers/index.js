import { combineReducers } from 'redux';
import auth from './auth';
import feed from './feed';
import search from './search';

export default combineReducers({
  auth,
  feed,
  search
});
