const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.use('/user', (request, response) => {
    response.sendFile(path.join(rootDir, 'views', 'user.html'));
});

module.exports = router;