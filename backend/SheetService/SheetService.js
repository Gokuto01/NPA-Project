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
app.get('/sheet', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT sheet_id, sheet.name as name, created_date, user_id, category.name as category FROM sheet join category on sheet.category_id = category.category_id');
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// delete sheet by id API
app.delete('/sheet/:sheet_id', async (req, res) => {
  const sheet_id = req.params.sheet_id;
  try {
    // Delete comments associated with the sheet
    await pool.query('DELETE FROM comment WHERE sheet_id = ?', [sheet_id]);

    // Delete the sheet
    const [result] = await pool.query('DELETE FROM sheet WHERE sheet_id = ?', [sheet_id]);
    return res.status(200).json({ message: 'Sheet deleted successfully' });
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Pdf API
app.get('/pdf', async (req, res) => {
  const { user_id } = req.query;

  try {
    const [rows, field] = await pool.query('SELECT * FROM sheet where user_id = ?', [user_id]);
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// sheet by id API
app.get('/pdf/:sheet_id', async (req, res) => {
  const sheet_id = req.params.sheet_id;
  try {
    const [rows, field] = await pool.query('SELECT sheet_id, sheet.name as name, created_date, user_id, category.name as category FROM sheet join category on sheet.category_id = category.category_id where sheet_id = ?', [sheet_id]);
    res.send(rows[0]);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

const port = 3004;
app.listen(port, () => {
  console.log(`Sheet service is running on port ${port}`);
});