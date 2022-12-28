// This file does not need to be diagnosed. As this is the only file that runs on the Main Process

const { app, ipcMain, BrowserWindow, shell, dialog } = require('electron');

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        title: 'SnailyCAD Manager',
        height: 600,
        minHeight: 600,
        width: 700,
        minWidth: 700,
        transparent: true,
        alwaysOnTop: true, // To prevent focus-loss on startup.
        titleBarStyle: 'hidden',
        icon: __dirname + '/public/icon-white-bg.png',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    const renderer = mainWindow.webContents;

    mainWindow.loadFile('./index.html');
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    })

    // IPC Functions
    ipcMain.on('focus', () => {
        mainWindow.setAlwaysOnTop(false);
        mainWindow.focus();
    }) // Focus App on Startup (Must be called in renderer)

    ipcMain.on('close', () => {
        mainWindow.close();
    })
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    })
    ipcMain.on('maximize', () => {
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(true);
            return;
        }
        mainWindow.setFullScreen(false);
        mainWindow.restore();
    })
    ipcMain.on('url', (e, arg) => {
        shell.openExternal(arg)
    })
    ipcMain.on('directory', (e, title) => {
        dialog.showOpenDialog(mainWindow, { title: title, properties: ['openDirectory'], defaultPath: '' }).then((result) => {
            renderer.send('dir-cb', `${result.filePaths}`);
        }).catch((err) => alert(err))
    })
    ipcMain.on('hard-restart', () => {
        app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
        app.exit(0);
    })
}

app.on('ready', createWindow);