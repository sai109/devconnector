const express = require('express');
const router = express.Router();

// @route 	GET api/posts/test
// @desc 		Tests Post Route
// @access 	Public
router.get('/test', (req, res) => res.status(200).json({	msg: 'Posts Works' }));

module.exports = router;