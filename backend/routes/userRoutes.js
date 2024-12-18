const express = require('express');
const { addUser, getLeaderboard } = require('../controllers/userController');
const router = express.Router();

router.post('/add', addUser);           // Add new user
router.get('/leaderboard', getLeaderboard); // Get leaderboard

module.exports = router;