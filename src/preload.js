const { readFile } = require('fs');

module.exports = {
    cadDir: require('./storage/config.json').cadDir,
    nodeEnv: require('./storage/config.json').nodeEnv,
    color: require('./storage/config.json').color,
    autoStart: require('./storage/config.json').autoStart,
    autoOpen: require('./storage/config.json').autoOpen
}

let config = readFile('./src/storage/config.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    return data;
  });

