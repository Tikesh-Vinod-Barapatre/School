const musicService = require('../services/musicService');

exports.searchTracks = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ message: 'Missing query q' });
    const data = await musicService.searchTracks(q);
    res.json(data);
  } catch (err) {
    console.error('searchTracks error', err.message);
    res.status(500).json({ message: 'Music search failed' });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user?._id?.toString();
    const data = await musicService.getRecommendations(userId);
    res.json(data);
  } catch (err) {
    console.error('getRecommendations error', err.message);
    res.status(500).json({ message: 'Recommendations failed' });
  }
};

exports.getRadio = async (req, res) => {
  try {
    const seed = (req.query.seed || 'popular').toString();
    const data = await musicService.getRadio(seed);
    res.json(data);
  } catch (err) {
    console.error('getRadio error', err.message);
    res.status(500).json({ message: 'Radio failed' });
  }
};
