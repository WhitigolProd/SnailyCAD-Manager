const path = require('path');
const { Menu, app } = require('electron');
module.exports.createMenu = () => {
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
                                detail: `
                                Made by Whitigol Web Design
                                App Version: ${app.getVersion()}
                                Discord: Whitigol#2122
                                `
                                    .split('\n')
                                    .map((s) => s.trim())
                                    .join('\n'),
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
        {
            label: 'Debug',
            submenu: [
                {
                    label: 'Hard Restart',
                    click: () => {
                        app.relaunch({
                            args: process.argv.slice(1).concat(['--relaunch']),
                        });
                        app.exit(0);
                    },
                },
            ],
        },
        {
            label: 'Support',
            submenu: [
                {
                    label: 'SnailyCAD Discord',
                    icon: path.join(__dirname, '/public/img/discord.png'),
                    click: () => {
                        shell.openExternal('https://discord.gg/xVM7AFSQ8M');
                    },
                },
                {
                    label: 'Report a Bug (GitHub)',
                    icon: path.join(__dirname, '/public/img/github.png'),
                    click: () => {
                        shell.openExternal(
                            'https://github.com/WhitigolProd/SnailyCAD-Manager/issues/new'
                        );
                    },
                },
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);
};
