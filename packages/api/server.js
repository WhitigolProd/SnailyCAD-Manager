const express = require('express');
const app = express();

app.listen('45789')

app.get('/', (req, res) => {
    res.json({
        "message": "Server Loaded"
    })
})