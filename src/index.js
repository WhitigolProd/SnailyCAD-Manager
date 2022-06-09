const electron = require('electron');
require('electron-reload');
const storage = require('electron-localstorage')

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;
const { nodeEnv, autoStart, autoOpen } = require('./preload');

// Handle Auto Updating
if (!require('electron-is-dev')) {
    const updateServer = `https://sc-updateserver.vercel.app/`
    const updateURL = `${updateServer}/update/${process.platform}/${app.getVersion()}`

    autoUpdater.setFeedURL({ updateURL })
}

console.log(app.getVersion())
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit(); // eslint-disable-line global-require

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 645,
        height: 500,
        minWidth: 645,
        minHeight: 500,
        transparent: true,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'img/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools: require('electron-is-dev'),
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // console.log(storage.getItem('cadDir'))

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Main Window Functions
    ipc.on('close-app', () => {
        mainWindow.close();
    });

    ipc.on('minimize-app', () => {
        mainWindow.minimize();
    });
};

//auto open
app.setLoginItemSettings({
    openAtLogin: storage.getItem('openOnStartup'),
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
