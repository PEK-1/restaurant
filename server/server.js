const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Corrected frontend port
    methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'indienne',
});

db.connect((err) => {
    if (err) {
        console.error(' Error connecting to MySQL:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Validation helper
const validateInput = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) return { valid: false, error: `${key} is required` };
    }
    return { valid: true };
};

// === ROUTES ===

// Register
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error saving user:', err.message);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error hashing password:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error querying user:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
});

// === MENU ROUTES ===

// Get menu
app.get('/api/menu', (req, res) => {
    const query = 'SELECT * FROM menu ORDER BY id ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching menu:', err.message);
            return res.status(500).json({ error: 'Failed to fetch menu' });
        }
        console.log('📋 Menu fetched:', results.length, 'items');
        res.status(200).json(results);
    });
});

// Add menu item
app.post('/api/menu', (req, res) => {
    const { title, price, tags, type } = req.body;

    const { valid, error } = validateInput({ title, price, tags, type });
    if (!valid) return res.status(400).json({ error });

    const query = 'INSERT INTO menu (title, price, tags, type) VALUES (?, ?, ?, ?)';
    db.query(query, [title, price, tags, type], (err, result) => {
        if (err) {
            console.error('Error adding menu item:', err.message);
            return res.status(500).json({ error: 'Failed to add menu item' });
        }
        console.log('✅ Menu item added:', title);
        res.status(201).json({ message: 'Menu item added successfully', menuId: result.insertId });
    });
});

// === BOOKING ROUTES ===

// Book table
app.post('/api/book-table', (req, res) => {
    const { name, date, time, guests } = req.body;
    const { valid, error } = validateInput({ name, date, time, guests });

    if (!valid) return res.status(400).json({ error });

    const query = 'INSERT INTO bookings (name, date, time, guests) VALUES (?, ?, ?, ?)';
    db.query(query, [name, date, time, guests], (err) => {
        if (err) {
            console.error('Error saving booking:', err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'This time slot is already booked. Please choose another.' });
            }
            return res.status(500).json({ error: 'Failed to save booking' });
        }
        res.status(201).json({ message: 'Table booked successfully!' });
    });
});

// Get bookings
app.get('/api/bookings', (req, res) => {
    const query = 'SELECT * FROM bookings ORDER BY date ASC, time ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err.message);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }
        res.status(200).json(results);
    });
});

// === FEEDBACK ROUTES ===

// Add feedback
app.post('/api/feedback', (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ error: 'Feedback is required' });
    }

    const query = 'INSERT INTO feedback (content) VALUES (?)';
    db.query(query, [feedback], (err, result) => {
        if (err) {
            console.error('Error saving feedback:', err.message);
            return res.status(500).json({ error: 'Failed to save feedback' });
        }
        res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: result.insertId });
    });
});

// Get feedback
app.get('/api/feedback', (req, res) => {
    const query = 'SELECT id, content, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at FROM feedback ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching feedback:', err.message);
            return res.status(500).json({ error: 'Failed to fetch feedback' });
        }
        res.status(200).json(results);
    });
});

// === START SERVER ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err.message);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});
