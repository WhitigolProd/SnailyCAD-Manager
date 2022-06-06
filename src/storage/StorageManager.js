const { writeFileSync } = require('node:fs');
const path = './src/storage/config.json';
const { config } = require('../preload');

module.exports = class StorageManager {
    constructor() {
        this.config = config;
    }
    set setCadDir(dir) {
        this.config.cadDir = dir;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setCadPort(port) {
        this.config.cadPort = port;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setCadAPI(api) {
        this.config.cadAPI = api;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setColor(color) {
        this.config.color = color;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setAutoOpen(autoOpen) {
        this.config.autoOpen = autoOpen;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setAutoStart(autoStart) {
        this.config.autoStart = autoStart;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
    set setFirstRun(firstRun) {
        this.config.firstRun = firstRun;
        writeFileSync(path, JSON.stringify(this.config, null, 2), (err) => {
            if (err) console.log(err);
        });
    }
};
