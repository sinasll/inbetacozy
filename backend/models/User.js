const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  telegramId: { type: String, unique: true, required: true },
  joinTime: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  referrals: { type: [String], default: [] }, // Array of usernames referred
  referralCount: { type: Number, default: 0 }, // Number of successful referrals
});

module.exports = mongoose.model('User', userSchema);