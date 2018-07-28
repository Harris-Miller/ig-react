import api from '../utils/api';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_SEARCH = 'SET_SEARCH';

export function fetchSearch(value) {
  return api.get(`/search?search=${value}`).then(res => res.data);
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  };
}

export function setSearch(data) {
  return {
    type: SET_SEARCH,
    data
  };
}
