const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = require('../Config/database')
const pool = mysql.createPool(dbConfig);

function generateToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

// Signup API
app.post('/signup', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const { email, password, name, surname, student_no, major_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.beginTransaction();
    const [rows1, field1] = await connection.query('INSERT INTO user (name, surname, email, password) VALUES (?, ?, ?, ?)',
      [name, surname, email, hashedPassword]);
    const [rows2, field2] = await connection.query('INSERT INTO student (student_no, major_id, information, user_id) VALUES (?, ?, ?, ?)',
      [student_no, major_id, null, rows1.insertId]);

    await connection.commit();
    return res.json({ message: 'User registered successfully' });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows1, field1] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows1.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows1[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a token and store it in the token table
    const token = generateToken(32); // Replace with your token generation logic
    await pool.query('INSERT INTO token (user_id, token) VALUES (?, ?)', [user.user_id, token]);

    return res.send(token);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Logout API
app.post('/logout', async (req, res) => {
  const { token } = req.body;
  try {
    const [rows, field] = await pool.query('SELECT * FROM token WHERE token = ?', [token]);
    if (rows.length === 0) {
      return res.send(false);
    }
    // Remove token
    await pool.query('DELETE FROM token WHERE token = ?', [token]);

    return res.send(true);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// getId API
app.get('/login', async (req, res) => {
  const { token } = req.query;
  try {
    const [rows, fields] = await pool.query('SELECT user.user_id, role FROM token JOIN user ON user.user_id = token.user_id WHERE token = ?', [token]);
    return res.send(rows[0]);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// getMajor API
app.get('/major', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM major ORDER BY major_id');
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Authen service is running on port ${port}`);
});