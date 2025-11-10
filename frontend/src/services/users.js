import api from './api';

export async function searchUsers(q) {
  const { data } = await api.get('/users/search', { params: { q } });
  return data; // { users }
}
