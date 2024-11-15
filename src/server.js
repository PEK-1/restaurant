const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


const validateUserInput = (email, password) => {
  if (!email || !password) {
    return { valid: false, error: 'Email and password are required' };
  }
  return { valid: true };
};

app.get('/', (req, res) => {
    res.send('Hello, world! This is the root endpoint.');
  });

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  const validation = validateUserInput(email, password);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);


    db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      (error, results) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send({ error: 'Email already exists' });
          }
          console.error('Database error:', error);
          return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request for email:', email);


  const validation = validateUserInput(email, password);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send({ error: 'Database error' });
    }

    console.log('Query Results:', results);

    if (results.length === 0) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }


      res.status(200).send({ message: 'Login successful', user: { email: user.email } });
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
