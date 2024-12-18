// Function to generate a random guest username
function generateRandomGuestUsername() {
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
    return `guest${randomString}`; // Return the random guest username
}

// Initialize the Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready(); // Initialize the WebApp

    // Get user information
    const user = Telegram.WebApp.initDataUnsafe.user;

    // Check if username exists
    if (user && user.username) {
        // Store the username only if it hasn't been stored already
        if (!localStorage.getItem('username')) {
            localStorage.setItem('username', user.username);
            localStorage.setItem('score', 0); // Initialize score to 0
        }
        document.getElementById('username').innerText = `@${localStorage.getItem('username')}`;
    } else {
        // Generate a random guest username if no Telegram username is available
        if (!localStorage.getItem('username')) {
            const guestUsername = generateRandomGuestUsername();
            localStorage.setItem('username', guestUsername);
            localStorage.setItem('score', 0); // Default score for guests
        }
        document.getElementById('username').innerText = `@${localStorage.getItem('username')}`;
    }
} else {
    // Fallback for non-WebApp environments
    console.log('Telegram WebApp is not available.');
    // If no username exists in localStorage, generate one and store it
    if (!localStorage.getItem('username')) {
        const guestUsername = generateRandomGuestUsername();
        localStorage.setItem('username', guestUsername); // Store guest username
        localStorage.setItem('score', 0); // Default score for guests
    }
    document.getElementById('username').innerText = `@${localStorage.getItem('username')}`;
}

// Function to get and display username from localStorage
function getUsername() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        document.getElementById('username').innerText = `@${storedUsername}`;
    } else {
        const guestUsername = generateRandomGuestUsername();
        localStorage.setItem('username', guestUsername); // Store guest username
        document.getElementById('username').innerText = `@${guestUsername}`;
    }
}

// Function to get and display score from localStorage
function getScore() {
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
        document.getElementById('score').innerText = storedScore;
    } else {
        localStorage.setItem('score', 0); // Default score is 0
        document.getElementById('score').innerText = 0;
    }
}

// Function to update the score in localStorage and on the page
function updateScore(newScore) {
    localStorage.setItem('score', newScore);
    document.getElementById('score').innerText = newScore;
}

// Handling button actions

// Function for NAV buttons
function goHome() {
    window.location.href = "index.html";
}

function goLeaderboard() {
    window.location.href = "leaderboard.html";
}

function goFriends() {
    window.location.href = "friends.html";
}

// Initial setup when the page loads
window.onload = function() {
    getUsername(); // Fetch and display username
    getScore(); // Fetch and display score
};

// Function to update the score in localStorage and on the page
function updateScore(newScore) {
    localStorage.setItem('score', newScore);
    document.getElementById('score').innerText = newScore;
}

// Function to update the score based on mining progress
function updateMiningScore() {
    const miningActive = localStorage.getItem('miningActive') === 'true';
    if (miningActive) {
        const storedScore = parseFloat(localStorage.getItem('score')) || 0;
        const lastMiningTime = parseInt(localStorage.getItem('lastMiningTime')) || Date.now();
        const elapsedSeconds = Math.floor((Date.now() - lastMiningTime) / 1000);

        // Calculate new score based on elapsed time (e.g., 0.001 points per second)
        const miningRate = 0.001; // Adjust the mining rate as needed
        const newScore = storedScore + elapsedSeconds * miningRate;

        // Display the updated score on the page without changing localStorage
        document.getElementById('score').innerText = newScore.toFixed(2);
    } else {
        // If mining is not active, just display the stored score
        const storedScore = localStorage.getItem('score') || 0;
        document.getElementById('score').innerText = storedScore;
    }
}

// Initial setup when the page loads
window.onload = function() {
    getUsername(); // Fetch and display username
    getScore(); // Fetch and display score
    setInterval(updateMiningScore, 1000); // Update mining score every second
};

// Function to share the bot via Telegram message
function shareBot() {
    const botUsername = '@cozybetabot';  // Change to your actual bot username
    const shareLink = `https://t.me/${botUsername}`;
    const message = `MINE endlessly and drink a coffee with COZY: ${shareLink}`;
    
    // Using the Telegram API to send the message (in a real app, you'd need additional integration)
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(message)}`, '_blank');
}

// Function to copy the bot's link
function copyLink() {
    const botLink = `https://t.me/cozybetabot`;  // Update with your actual bot link
    navigator.clipboard.writeText(botLink).then(() => {
        alert('Bot link copied to clipboard!');
    }).catch(err => {
        console.error('Error copying link: ', err);
    });
}

// Function to track invited friends
function addFriend(username) {
    const friendsList = document.getElementById('friendsList');
    
    // Create a new list item with the friend's username
    const newFriend = document.createElement('li');
    newFriend.textContent = `@${username}`;
    
    // Append to the friends list
    friendsList.appendChild(newFriend);
}

// Example usage: Call this function when a friend successfully joins (you'll need backend integration to track actual invites)
addFriend('');