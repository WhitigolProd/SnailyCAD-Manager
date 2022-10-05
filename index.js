// This file does not need to be diagnosed. As this is the only file that runs on the Main Process

const { app, ipcMain, BrowserWindow } = require('electron');

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        height: 500,
        width: 700,
        alwaysOnTop: true, // To prevent focus-loss on startup.
        titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadFile('./index.html');
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    })

    // IPC Functions
    ipcMain.on('focus', () => {
        mainWindow.setAlwaysOnTop(false);
        mainWindow.focus();
    }) // Focus App on Startup (Must be called in renderer)
}

app.on('ready', createWindow);