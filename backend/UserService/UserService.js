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

// GetProfile API
app.get('/profile/student', async (req, res) => {
    const { user_id } = req.query;

    try {
        const [rows, fields] = await pool.query('SELECT * FROM user JOIN student ON user.user_id = student.user_id WHERE user.user_id = ?', [user_id]);
        return res.send(rows[0])
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(500).json({ error: 'Token verification failed' });
    }
});

// UpdateProfile API
app.put('/profile/student', async (req, res) => {
    const { email, name, surname, student_no, major, information, user_id } = req.body;
    let connection;

    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();
        const [rows1, field1] = await connection.query('UPDATE user SET email = ?, name = ?, surname = ? WHERE user_id = ?',
            [email, name, surname, user_id]);

        const [rows2, field2] = await connection.query('UPDATE student SET student_no = ?, major_id = ?, information = ? WHERE user_id = ?',
            [student_no, major, information, user_id]);

        await connection.commit();
        return res.json({ message: 'User Profile Update successfully' });
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

// GetProfile admin API
app.get('/profile/admin', async (req, res) => {
    const { user_id } = req.query;

    try {
        const [rows, fields] = await pool.query('SELECT * FROM user WHERE user.user_id = ?', [user_id]);
        return res.send(rows[0])
    } catch (error) {
        console.error('Error decoding token:', error);
        return res.status(500).json({ error: 'Token verification failed' });
    }
});

// UpdateProfile admin API
app.put('/profile/admin', async (req, res) => {
    const { email, name, surname, user_id } = req.body;
    let connection;

    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();
        const [rows1, field1] = await connection.query('UPDATE user SET email = ?, name = ?, surname = ? WHERE user_id = ?',
            [email, name, surname, user_id]);
        await connection.commit();
        return res.json({ message: 'User Profile Update successfully' });
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

// UpdatePassword API
app.put('/password', async (req, res) => {
    const { password, user_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [rows, field] = await pool.query('UPDATE user SET password = ? WHERE user_id = ?',
            [hashedPassword, user_id]);

        return res.json({ message: 'Password Update successfully' });
    } catch (error) {
        console.error('Error executing database query:', error);
        return res.status(500).json({ error: 'Database error' });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`User service is running on port ${port}`);
});