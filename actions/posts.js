import api from '../utils/api';

export const ADD_POSTS = 'ADD_POSTS';
export const CLEAR_POSTS = 'CLEAR_POSTS';

export function fetchPosts(userId, page = 1) {
  return api.get(`/users/${userId}/posts`).then(res => res.data);
}

export function addPosts(userId, data) {
  return {
    type: ADD_POSTS,
    userId,
    data
  };
}

export function clearPosts(userId) {
  return {
    type: CLEAR_POSTS,
    userId
  };
}
