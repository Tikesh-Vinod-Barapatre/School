const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ message: 'Missing query q' });
    const criteria = {
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    };
    const users = await User.find(criteria).select('_id name email createdAt');
    res.json({ users });
  } catch (err) {
    console.error('searchUsers error', err.message);
    res.status(500).json({ message: 'User search failed' });
  }
};
