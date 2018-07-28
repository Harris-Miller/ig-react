import api from '../utils/api';

export const ADD_PROFILE = 'ADD_PROFILE';

export function fetchProfile(userId) {
  return api.get(`/users/${userId}`).then(res => res.data);
}

export function addProfile(data) {
  return {
    type: ADD_PROFILE,
    data
  };
}
