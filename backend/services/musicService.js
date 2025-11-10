const axios = require('axios');
const cache = require('../utils/cache');

const JAMENDO_BASE = 'https://api.jamendo.com/v3.0';
const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID;
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

const fallbackTracks = () => ([
  { id: '1', title: 'Neon Nights', artist: 'Echo', cover: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=60', stream: '' },
  { id: '2', title: 'Midnight Drive', artist: 'Nova', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=60', stream: '' },
  { id: '3', title: 'Afterglow', artist: 'Pulse', cover: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d4?auto=format&fit=crop&w=400&q=60', stream: '' },
]);

async function jamendoSearch(q) {
  if (!JAMENDO_CLIENT_ID) return { tracks: fallbackTracks(), source: 'fallback' };
  const url = `${JAMENDO_BASE}/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&namesearch=${encodeURIComponent(q)}&include=musicinfo+stats+licenses`;
  const { data } = await axios.get(url);
  const tracks = (data?.results || []).map(t => ({
    id: t.id?.toString(),
    title: t.name,
    artist: t.artist_name,
    cover: t.album_image || t.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=60',
    stream: t.audio || t.audio_download || '',
  }));
  return { tracks, source: 'jamendo' };
}

async function lastfmTop() {
  if (!LASTFM_API_KEY) return fallbackTracks();
  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json&limit=20`;
  const { data } = await axios.get(url);
  const tracks = (data?.tracks?.track || []).map((t, idx) => ({
    id: String(idx+1),
    title: t.name,
    artist: t.artist?.name,
    cover: t.image?.[2]?.['#text'] || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=60',
    stream: ''
  }));
  return tracks;
}

exports.searchTracks = async (q) => {
  const key = `search:${q}`;
  const cached = cache.get(key);
  if (cached) return cached;
  try {
    const result = await jamendoSearch(q);
    cache.set(key, result, 60);
    return result;
  } catch (e) {
    const fb = { tracks: fallbackTracks(), source: 'fallback' };
    cache.set(key, fb, 30);
    return fb;
  }
};

exports.getRecommendations = async (userId) => {
  const key = `reco:${userId || 'anon'}`;
  const cached = cache.get(key);
  if (cached) return cached;
  let tracks = [];
  try {
    // naive: use last.fm top as global recos
    tracks = await lastfmTop();
  } catch (e) {
    tracks = fallbackTracks();
  }
  const result = { tracks, source: LASTFM_API_KEY ? 'lastfm' : 'fallback' };
  cache.set(key, result, 120);
  return result;
};

exports.getRadio = async (seed) => {
  const key = `radio:${seed}`;
  const cached = cache.get(key);
  if (cached) return cached;
  // simple: use jamendo search for seed term
  try {
    const result = await jamendoSearch(seed);
    cache.set(key, result, 90);
    return result;
  } catch (e) {
    const fb = { tracks: fallbackTracks(), source: 'fallback' };
    cache.set(key, fb, 60);
    return fb;
  }
};
