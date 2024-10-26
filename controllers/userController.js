const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new user
exports.createUser = (req, res) => {
    const { name, surname, email, password, profilePic } = req.body;
    const userID = uuidv4();
    const sql = 'INSERT INTO Users (userID, name, surname, email, password, profilePic) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [userID, name, surname, email, password, profilePic], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ userID, name, surname, email, profilePic });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const sql = 'SELECT * FROM Users WHERE userID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(result[0]);
    });
};

// Update a user
exports.updateUser = (req, res) => {
    const { name, surname, email, password, profilePic } = req.body;
    const sql = 'UPDATE Users SET name = ?, surname = ?, email = ?, password = ?, profilePic = ? WHERE userID = ?';

    db.query(sql, [name, surname, email, password, profilePic, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User updated successfully' });
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
    const sql = 'DELETE FROM Users WHERE userID = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User deleted successfully' });
    });
};