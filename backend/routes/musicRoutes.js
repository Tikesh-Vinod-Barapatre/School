const express = require('express');
const { searchTracks, getRecommendations, getRadio } = require('../controllers/musicController');
const { startOAuth, callbackOAuth, oauthStatus } = require('../controllers/musicAuthController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// public search (or protected if desired)
router.get('/search', protect, searchTracks);
router.get('/recommendations', protect, getRecommendations);
router.get('/radio', protect, getRadio);
router.get('/oauth/start', protect, startOAuth);
router.get('/oauth/callback', callbackOAuth); // redirect hits without auth
router.get('/oauth/status', protect, oauthStatus);

module.exports = router;
