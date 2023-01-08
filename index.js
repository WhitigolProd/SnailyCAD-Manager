// This file does not need to be diagnosed. As this is the only file that runs on the Main Process

const {
    app,
    ipcMain,
    BrowserWindow,
    shell,
    dialog,
    Menu,
} = require('electron');
const {
    setupTitleBar,
    attachTitlebarToWindow,
} = require('custom-electron-titlebar/main');
const path = require('path');

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        title: 'SnailyCAD Manager',
        height: 600,
        minHeight: 600,
        width: 700,
        minWidth: 700,
        transparent: true,
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

    attachTitlebarToWindow(mainWindow);

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

    // Menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    click: () => {
                        mainWindow.reload();
                    },
                },
                {
                    label: 'DevTools',
                    click: () => {
                        mainWindow.webContents.openDevTools();
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'SnailyCAD Website',
                    click: () => {
                        shell.openExternal(
                            'https://snailycad.caspertheghost.me'
                        );
                    },
                },
                {
                    label: 'SnailyCAD Discord',
                    click: () => {
                        shell.openExternal('https://discord.gg/xVM7AFSQ8M');
                    },
                },
                {
                    label: 'SnailyCAD GitHub',
                    click: () => {
                        shell.openExternal(
                            'https://github.com/SnailyCAD/snaily-cadv4'
                        );
                    },
                },
                {
                    type: 'separator',
                },
                {
                    label: 'SnailyCAD Manager Website',
                    click: () => {
                        shell.openExternal('https://manager.cossys.tk');
                    },
                },
                {
                    label: 'SnailyCAD Manager GitHub',
                    click: () => {
                        shell.openExternal(
                            'https://github.com/WhitigolProd/SnailyCAD-Manager'
                        );
                    },
                },

                {
                    type: 'separator',
                },
                {
                    label: 'About',
                    click: () => {
                        dialog
                            .showMessageBox(mainWindow, {
                                title: 'About',
                                message: 'SnailyCAD Manager',
                                detail: 'Made by Whitigol Web Design',
                                buttons: ['Close', 'GitHub'],
                            })
                            .then((result) => {
                                if (result.response === 1) {
                                    shell.openExternal(
                                        'https://github.com/WhitigolProd'
                                    );
                                }
                            });
                    },
                },
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);
};

app.on('ready', createWindow);
