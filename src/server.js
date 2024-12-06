const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3107',
    database: 'indienne',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        process.exit(1); 
    } else {
        console.log('Connected to MySQL database');
    }
});

const validateInput = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return { valid: false, error: `${key} is required` };
        }
    }
    return { valid: true };
};

const bcrypt = require('bcrypt');

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
});


app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error saving user:', err.message);
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});


app.get('/api/menu', (req, res) => {
    const query = 'SELECT * FROM menu ORDER BY id ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching menu:', err.message);
            return res.status(500).json({ error: 'Failed to fetch menu' });
        }
        res.status(200).json(results);
    });
});

app.post('/api/menu', (req, res) => {
    const { title, price, tags } = req.body;

    if (!title || !price || !tags) {
        return res.status(400).json({ error: 'Title, price, and tags are required' });
    }

    const query = 'INSERT INTO menu (title, price, tags) VALUES (?, ?, ?)';
    db.query(query, [title, price, tags], (err, result) => {
        if (err) {
            console.error('Error adding menu item:', err.message);
            return res.status(500).json({ error: 'Failed to add menu item' });
        }
        res.status(201).json({ message: 'Menu item added successfully', menuId: result.insertId });
    });
});



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

app.post('/api/book-table', (req, res) => {
    const { name, date, time, guests } = req.body;

    const { valid, error } = validateInput({ name, date, time, guests });
    if (!valid) {
        return res.status(400).json({ error });
    }

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err.message);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});
