const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new like
exports.createLike = (req, res) => {
    const { userID, postID, commentID } = req.body;
    const likeID = uuidv4();
    const sql = 'INSERT INTO Likes (likeID, userID, postID, commentID) VALUES (?, ?, ?, ?)';

    db.query(sql, [likeID, userID, postID, commentID], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ likeID, userID, postID, commentID });
    });
};

// Get likes by user ID
exports.getLikesByUserId = (req, res) => {
    const sql = 'SELECT * FROM Likes WHERE userID = ?';
    db.query(sql, [req.params.userID], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Delete a like
exports.deleteLike = (req, res) => {
    const sql = 'DELETE FROM Likes WHERE likeID = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Like deleted successfully' });
    });
};