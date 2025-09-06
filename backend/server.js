const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// --- IMPORTANT: CONFIGURE YOUR DATABASE CONNECTION HERE ---
const dbConfig = {
    host: 'localhost',
    user: 'root',       // <-- Your MySQL username (often 'root')
    password: 'Vikas@123', // <-- Your MySQL password
    database: 'portfolio_db'
};

const pool = mysql.createPool(dbConfig);

// API Endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
    
    pool.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Failed to save message.' });
        }
        console.log('Message saved successfully:', result);
        res.status(200).json({ message: 'Message received and saved successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Test database connection on startup
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Failed to connect to the database:', err);
            return;
        }
        console.log('Successfully connected to the MySQL database.');
        connection.release();
    });
});