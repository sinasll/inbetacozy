const User = require('../models/User');
const referralService = require('../services/referralService');

// Add a new user
exports.addUser = async (req, res) => {
  const { username, telegramId, referrer } = req.body;

  try {
    let user = await User.findOne({ telegramId });

    if (!user) {
      user = new User({ username, telegramId });

      // Handle referral using the referral service
      await referralService.handleReferral(user, referrer);

      await user.save();
    }

    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ score: -1 }) // Sort by score descending
      .limit(10);          // Top 10 users

    res.status(200).json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};