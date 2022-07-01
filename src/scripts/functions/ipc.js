const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

const control = {
    app: {
        close: function () {
            ipc.send('close-app');
        },

        minimize: function () {
            ipc.send('minimize-app');
        },
    },
};
