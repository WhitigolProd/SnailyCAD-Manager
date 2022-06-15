const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

$(elements.titlebar.buttons.close).on('click', () => ipc.send('close-app'));

$(elements.titlebar.buttons.minimize).on('click', () => {
    ipc.send('minimize-app');
});

const control = {
    app: {
        close: function () {
            ipc.send('close-app');
        },

        minimize: function () {
            ipc.send('minimize-app');
        }
    }
}