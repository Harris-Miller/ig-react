import api from '../utils/api';

export const RESET_FEED = 'RESET_FEED';
export const ADD_TO_FEED = 'ADD_TO_FEED';
export const CLEAR_FEED = 'CLEAR_FEED';

export function fetchFeedData() {
  return api.get('/posts').then(res => res.data);
}

export function resetFeed(data) {
  return {
    type: RESET_FEED,
    data
  };
}

export function addToFeed(startFrom) {

}

export function clearFeed() {
  return {
    type: CLEAR_FEED
  }
}