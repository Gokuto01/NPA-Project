const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = require('../Config/database')
const pool = mysql.createPool(dbConfig);

// comment API
app.get('/comment/:sheet_id', async (req, res) => {
  const sheetId = req.params.sheet_id;
  try {
    // Assuming you have a "comment" table in your database schema
    const [rows, fields] = await pool.query('SELECT * FROM comment WHERE sheet_id = ? ORDER BY created_date', [sheetId]);
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// add comment API
app.post('/comment', async (req, res) => {
  const { comment, user_id, sheet_id } = req.body;
  try {
    // Assuming you have a "comment" table in your database schema
    const query = 'INSERT INTO comment (comment, user_id, sheet_id) VALUES (?, ?, ?)';
    const [rows, fields] = await pool.query(query, [comment, user_id, sheet_id]);

    res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// delete comment
app.delete('/comment/:comment_id', async (req, res) => {
  const commentId = req.params.comment_id;
  try {
    // Assuming you have a "comment" table in your database schema
    const query = 'DELETE FROM comment WHERE comment_id = ?';
    const [rows, fields] = await pool.query(query, [commentId]);

    return res.status(204).send(rows); // Comment successfully deleted
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

const port = 3003;
app.listen(port, () => {
  console.log(`Comment service is running on port ${port}`);
});