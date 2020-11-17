const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('<h1>Hello from Express!');
});

module.exports = router;
