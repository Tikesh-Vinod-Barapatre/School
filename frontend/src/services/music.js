import api from './api';

export async function searchTracks(q) {
  const { data } = await api.get(`/music/search`, { params: { q } });
  return data; // { tracks, source }
}

export async function getRecommendations() {
  const { data } = await api.get('/music/recommendations');
  return data; // { tracks, source }
}

export async function getRadio(seed) {
  const { data } = await api.get('/music/radio', { params: { seed } });
  return data; // { tracks, source }
}

export async function getJamendoStatus() {
  const { data } = await api.get('/music/oauth/status');
  return data; // { connected: boolean }
}

export async function startJamendoOAuth() {
  const { data } = await api.get('/music/oauth/start');
  return data; // { authUrl, state }
}
