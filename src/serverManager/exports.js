module.exports = {
    appStorage: require('./appStorage.json'),
    config: require('./config.json'),
};

setInterval(() => {
    module.exports = {
        appStorage: require('./appStorage.json'),
        config: require('./config.json'),
    };
}, 1500);
