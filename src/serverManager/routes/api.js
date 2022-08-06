const express = require(`express`);
const { appStorage, app } = require('../exports');
const router = express.Router();
require(`../exports`); // Require Exported Variables
const path = require(`path`);
const fs = require('fs');

let remote = {
    json: {
        cad: {
            start: false,
            stop: false,
        },
    },
    send: () => {
        fs.writeFile(
            path.join(__dirname, '../api/api.json'),
            JSON.stringify(remote.json, null, 2),
            (err) => {
                if (err) console.error(err);
            }
        );
    },
    reset: () => {
        remote.json.cad.start = false;
        remote.json.cad.stop = false;
    },
};

router.get('/', (req, res) => {
    res.render('denied');
});

router.post('/start', (req, res) => {
    remote.json.cad.start = true;
    remote.send();
    res.send('200');
    remote.reset();
});

router.post('/stop', (req, res) => {
    remote.json.cad.stop = true;
    remote.send();
    res.send('200');
    remote.reset();
});

router.post('/log', (req, res) => {
    let currentDate = new Date().toLocaleDateString();
    let currentTime = new Date().toLocaleTimeString();
    res.send('200');
    console.log(`New Access from: ${req.body.ip}`);
    fs.appendFile(
        path.join(__dirname, '../logs/access.log'),
        `${currentDate} @ ${currentTime}> Access from ${req.body.ip}\n`,
        (err) => {
            if (err) throw err;
        }
    );
});

module.exports = router;
