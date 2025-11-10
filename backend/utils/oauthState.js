const crypto = require('crypto');
const store = new Map();

function create(userId, ttlSeconds = 600) {
  const state = crypto.randomBytes(16).toString('hex');
  const expires = Date.now() + ttlSeconds * 1000;
  store.set(state, { userId, expires });
  return state;
}

function use(state) {
  const entry = store.get(state);
  if (!entry) return null;
  store.delete(state);
  if (Date.now() > entry.expires) return null;
  return entry.userId;
}

module.exports = { create, use };
