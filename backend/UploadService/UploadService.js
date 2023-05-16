const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 50000 }));
app.use(cors());

const dbConfig = require('../Config/database');
const { resolveSoa } = require('dns');
const pool = mysql.createPool(dbConfig);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the directory where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename to be unique by appending the current timestamp
  },
});
const upload = multer({ storage });

// Upload API
app.post('/upload', upload.single('file'), async (req, res) => {
  const { user_id, category, name } = req.body;
  const file = req.file;
  const filePath = file.path;

  try {
    const [rows, field] = await pool.query('INSERT INTO sheet (name, file, category_id, user_id) VALUES (?, ?, ?, ?)', [name, filePath, category, user_id]);
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Category API
app.get('/category', async (req, res) => {
  try {
    const [rows, field] = await pool.query('SELECT * FROM category order by category_id');
    return res.send(rows);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Pdf by id API
app.get('/pdf/:sheet_id/file', async (req, res) => {
  const sheet_id = req.params.sheet_id;
  try {
    const [rows, field] = await pool.query('SELECT * FROM sheet where sheet_id = ?', [sheet_id]);
    const filePath = path.join(__dirname, rows[0].file);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="converted_${sheet_id}.pdf"`);

    // Send the Buffer data as the response
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error executing database query:', error);
    return res.status(500).json({ error: 'Database error' });
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`Upload service is running on port ${port}`);
});