// This file does not need to be diagnosed. As this is the only file that runs on the Main Process

const {
    app,
    ipcMain,
    BrowserWindow,
    shell,
    dialog,
    Menu,
} = require('electron');
const path = require('path');
const { createMenu } = require('./index.config');

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        title: 'SnailyCAD Manager',
        height: 600,
        minHeight: 600,
        width: 700,
        minWidth: 700,
        transparent: false,
        alwaysOnTop: true, // To prevent focus-loss on startup.
        maximizable: true,
        titleBarStyle: 'default',
        icon: __dirname + '/public/icon-white-bg.png',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const renderer = mainWindow.webContents;

    mainWindow.loadFile('./index.html');
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    // IPC Functions
    ipcMain.on('focus', () => {
        mainWindow.setAlwaysOnTop(false);
        mainWindow.focus();
    }); // Focus App on Startup (Must be called in renderer)

    ipcMain.on('close', () => {
        mainWindow.close();
    });
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });
    ipcMain.on('maximize', () => {
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(true);
            return;
        }
        mainWindow.setFullScreen(false);
        mainWindow.restore();
    });
    ipcMain.on('url', (e, arg) => {
        shell.openExternal(arg);
    });
    ipcMain.on('directory', (e, title) => {
        dialog
            .showOpenDialog(mainWindow, {
                title: title,
                properties: ['openDirectory'],
                defaultPath: '',
            })
            .then((result) => {
                renderer.send('dir-cb', `${result.filePaths}`);
            })
            .catch((err) => alert(err));
    });
    ipcMain.on('hard-restart', () => {
        app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
        app.exit(0);
    });
    ipcMain.on('devTools', () => {
        mainWindow.webContents.openDevTools();
    });

    ipcMain.on('online', () => {
        mainWindow.setOverlayIcon(
            path.join(__dirname, '/public/overlay/online.png'),
            'Online'
        );
    });
    ipcMain.on('offline', () => {
        mainWindow.setOverlayIcon(
            path.join(__dirname, '/public/overlay/offline.png'),
            'Offline'
        );
    });

    ipcMain.on('popup', (e, args) => {
        dialog.showMessageBox(mainWindow, {
            type: 'warning',
            buttons: ['OK'],
            title: args.title,
            message: args.message,
        });
    });

    createMenu(mainWindow);
};

app.on('ready', createWindow);
