const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',      
  user: 'root',  
  password: '3107',
  database: 'indienne'     
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/api/menu', (req, res) => {
  db.query('SELECT * FROM menu', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
