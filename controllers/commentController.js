const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new comment
exports.createComment = (req, res) => {
    const { postID, creatorUserID, parentCommentID, text, imageURL, fileURL } = req.body;
    const commentID = uuidv4();
    const sql = 'INSERT INTO Comments (commentID, postID, creatorUserID, parentCommentID, text, imageURL, fileURL) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [commentID, postID, creatorUserID, parentCommentID, text, imageURL, fileURL], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ commentID, postID, creatorUserID, parentCommentID, text, imageURL, fileURL });
    });
};

// Get all comments for a post
exports.getAllCommentsForPost = (req, res) => {
    const sql = 'SELECT * FROM Comments WHERE postID = ?';
    db.query(sql, [req.params.postID], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Update a comment
exports.updateComment = (req, res) => {
    const { postID, creatorUserID, parentCommentID, text, imageURL, fileURL } = req.body;
    const sql = 'UPDATE Comments SET postID = ?, creatorUserID = ?, parentCommentID = ?, text = ?, imageURL = ?, fileURL = ? WHERE commentID = ?';

    db.query(sql, [postID, creatorUserID, parentCommentID, text, imageURL, fileURL, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Comment updated successfully' });
    });
};

// Delete a comment
exports.deleteComment = (req, res) => {
    const sql = 'DELETE FROM Comments WHERE commentID = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
};