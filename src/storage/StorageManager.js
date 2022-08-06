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
    firstRun: function (firstRun) {
        localStorage.setItem('firstRun', firstRun);
        config.firstRun = firstRun;
    },
};
