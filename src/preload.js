const { command } = require('./scripts/functions/commandline');
const { app } = require('electron');

module.exports = {
    cadDir: require('./storage/config.json').cadDir,
    nodeEnv: require('./storage/config.json').nodeEnv,
    color: require('./storage/config.json').color,
    autoStart: require('./storage/config.json').autoStart,
    autoOpen: require('./storage/config.json').autoOpen,
    config: require('./storage/config.json'),
};
if (module.exports.autoStart)
    command(
        `yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
    );
