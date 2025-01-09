// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();
app.use(bodyParser.json());

// Mock databases
const profiles = [];
const users = [
    { email: 'test@example.com', password: 'password123' } // Mock user for login
];

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate URL format
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

// POST /profile endpoint
app.post('/profile', (req, res) => {
    const { name, age, gender, location, interests, profilePicture } = req.body;

    // Validate fields
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing name.' });
    }
    if (!age || typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ error: 'Invalid or missing age.' });
    }
    const ALLOWED_GENDERS = ['male', 'female']; // Use lowercase for comparison

    if (!gender || typeof gender !== 'string' || !ALLOWED_GENDERS.includes(gender.toLowerCase())) {
        return res.status(400).json({ error: `Invalid or missing gender. Allowed values are: ${ALLOWED_GENDERS.join(', ')}.` });
    }
    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing location.' });
    }
    if (!interests || !Array.isArray(interests) || interests.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing interests.' });
    }
    if (!profilePicture || !isValidURL(profilePicture)) {
        return res.status(400).json({ error: 'Invalid or missing profile picture URL.' });
    }

    // Check for duplicate profile
    if (profiles.some(profile => profile.name === name)) {
        return res.status(409).json({ error: 'Profile with this name already exists.' });
    }

    // Add profile to mock database
    profiles.push({ name, age, gender, location, interests, profilePicture });
    res.status(201).json({ message: 'Profile created successfully.' });
});

// POST /login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid or missing email.' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing password.' });
    }

    // Check credentials against mock database
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error.' });
});

// Start the server
const PORT = 3080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});