// Simple in-memory token store (NOT for production persistence)
const store = new Map(); // key: userId => { accessToken, expiresAt }

function set(userId, accessToken, ttlSeconds) {
  const expiresAt = Date.now() + (ttlSeconds * 1000);
  store.set(userId, { accessToken, expiresAt });
}

function get(userId) {
  const entry = store.get(userId);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { store.delete(userId); return null; }
  return entry;
}

module.exports = { set, get };
