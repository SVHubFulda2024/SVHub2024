const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.createLike);
router.get('/users/:userID', likeController.getLikesByUserId);
router.delete('/:id', likeController.deleteLike);

module.exports = router;