const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.use('/', (request, response) => {
       response.sendFile(path.join(rootDir, 'views', 'index.html'));
});

module.exports = router;