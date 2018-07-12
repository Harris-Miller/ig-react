import api from '../utils/api';

export const RESET_FEED = 'RESET_FEED';
export const ADD_TO_FEED = 'ADD_TO_FEED';

export function resetFeed() {
  return api.get('/posts').then(res => ({
    type: RESET_FEED,
    data: res.data
  }));
}

export function addToFeed(startFrom) {

}