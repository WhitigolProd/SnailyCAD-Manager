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
    openOnStartup: function (openOnStartup) {
        localStorage.setItem('openOnStartup', openOnStartup);
        config.openOnStartup = openOnStartup;
    },
    autoRun: function (autoStart) {
        localStorage.setItem('autoStart', autoStart);
        config.autoStart = autoStart;
    },
    firstRun: function (firstRun) {
        localStorage.setItem('firstRun', firstRun);
        config.firstRun = firstRun;
    },
};
