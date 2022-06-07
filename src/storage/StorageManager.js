// Get Initial Configuration
let config = {
    cadDir: localStorage.getItem('cadDir'),
    cadPort: localStorage.getItem('cadPort'),
    cadAPI: localStorage.getItem('cadAPI'),
    nodeEnv: 'development',
    color: localStorage.getItem('color'),
    autoStart: localStorage.getItem('autoStart'),
    firstRun: localStorage.getItem('firstRun')
}


const setConfig = {
    cadDir: function (cadDir) {
        localStorage.setItem('cadDir', cadDir);
        config.cadDir = cadDir;
    },
    cadPort: function (cadPort) {
        localStorage.setItem('cadPort', cadPort);
        config.cadPort = cadPort;
    },
    cadAPI: function (cadAPI) {
        localStorage.setItem('cadAPI', cadAPI);
        config.cadAPI = cadAPI;
    },
    color: function (color) {
        localStorage.setItem('color', color);
        config.color = color;
    },
    autoRun: function (autoStart) {
        localStorage.setItem('autoStart', autoStart);
        config.autoStart = autoStart;
    }
}