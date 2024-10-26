// controllers/postController.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new post
exports.createPost = (req, res) => {
    const { creatorUserID, text, imageURL, fileURL } = req.body;
    const postID = uuidv4();
    const sql = 'INSERT INTO Posts (postID, creatorUserID, text, imageURL, fileURL) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [postID, creatorUserID, text, imageURL, fileURL], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ postID, creatorUserID, text, imageURL, fileURL });
    });
};

// Get all posts
exports.getAllPosts = (req, res) => {
    const sql = 'SELECT * FROM Posts';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Get a post by ID
exports.getPostById = (req, res) => {
    const sql = 'SELECT * FROM Posts WHERE postID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(result[0]);
    });
};

// Update a post
exports.updatePost = (req, res) => {
    const { creatorUserID, text, imageURL, fileURL } = req.body;
    const sql = 'UPDATE Posts SET creatorUserID = ?, text = ?, imageURL = ?, fileURL = ? WHERE postID = ?';

    db.query(sql, [creatorUserID, text, imageURL, fileURL, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Post updated successfully' });
    });
};

// Delete a post
exports.deletePost = (req, res) => {
    const sql = 'DELETE FROM Posts WHERE postID = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Post deleted successfully' });
    });
};