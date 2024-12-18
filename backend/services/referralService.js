const User = require('../models/User');

// Add a referral to the referring user and increment their referral count
async function addReferral(referrerUsername, referredUsername) {
  try {
    // Find the referrer
    const referrer = await User.findOne({ username: referrerUsername });
    if (!referrer) {
      throw new Error('Referrer not found');
    }

    // Find the referred user
    const referredUser = await User.findOne({ username: referredUsername });
    if (!referredUser) {
      throw new Error('Referred user not found');
    }

    // Add referred user to referrer's referrals list and increment referral count
    referrer.referrals.push(referredUsername);
    referrer.referralCount += 1;

    await referrer.save();
    return referrer;  // Return the updated referrer document
  } catch (error) {
    throw new Error(error.message);
  }
}

// Check if the user exists and handle referral
async function handleReferral(user, referrerUsername) {
  try {
    if (referrerUsername) {
      const updatedReferrer = await addReferral(referrerUsername, user.username);
      console.log(`Referral added for ${referrerUsername}, new count: ${updatedReferrer.referralCount}`);
    }
  } catch (error) {
    console.error('Error handling referral:', error.message);
  }
}

module.exports = { handleReferral };