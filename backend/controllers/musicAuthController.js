const axios = require('axios');
const oauthState = require('../utils/oauthState');
const tokens = require('../utils/integrationTokens');

// Jamendo OAuth docs: https://developer.jamendo.com/v3.0/authentication
// We only scaffold start + callback; token persistence optional.

const JAMENDO_CLIENT_ID = process.env.JAMENDO_CLIENT_ID;
const JAMENDO_CLIENT_SECRET = process.env.JAMENDO_CLIENT_SECRET;
const JAMENDO_REDIRECT_URI = process.env.JAMENDO_REDIRECT_URI;

exports.startOAuth = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (!JAMENDO_CLIENT_ID || !JAMENDO_REDIRECT_URI) {
    return res.status(400).json({ message: 'Jamendo client id or redirect uri missing' });
  }
  const state = oauthState.create(req.user._id.toString());
  const authUrl = `https://api.jamendo.com/v3.0/oauth/authorize?client_id=${JAMENDO_CLIENT_ID}&redirect_uri=${encodeURIComponent(JAMENDO_REDIRECT_URI)}&response_type=code&scope=music&state=${state}`;
  res.json({ authUrl, state });
};

exports.callbackOAuth = async (req, res) => {
  const { code, state } = req.query;
  if (!code) return res.status(400).json({ message: 'Missing code' });
  const userId = state ? oauthState.use(state) : null;
  if (!userId) {
    return res.status(400).json({ message: 'Invalid or expired OAuth state' });
  }
  try {
    if (!JAMENDO_CLIENT_ID || !JAMENDO_CLIENT_SECRET || !JAMENDO_REDIRECT_URI) {
      return res.status(400).json({ message: 'Jamendo credentials incomplete' });
    }
    const tokenUrl = `https://api.jamendo.com/v3.0/oauth/token`;
    const form = new URLSearchParams({
      client_id: JAMENDO_CLIENT_ID,
      client_secret: JAMENDO_CLIENT_SECRET,
      redirect_uri: JAMENDO_REDIRECT_URI,
      grant_type: 'authorization_code',
      code
    });
    const { data } = await axios.post(tokenUrl, form.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    // data should include access_token, expires_in
    if (data?.access_token) {
      tokens.set(userId, data.access_token, Number(data.expires_in || 3600));
    }
    // Redirect back to app
    const redirect = process.env.APP_HOME_URL || 'http://localhost:3000/home';
    const url = `${redirect}?jamendo=connected`;
    res.redirect(url);
  } catch (err) {
    console.error('Jamendo OAuth callback error', err.response?.data || err.message);
    res.status(500).json({ message: 'OAuth exchange failed' });
  }
};

exports.oauthStatus = (req, res) => {
  if (!req.user) return res.status(401).json({ connected: false });
  const t = tokens.get(req.user._id.toString());
  res.json({ connected: !!t });
};
