// Handle Keyboard Shortcuts
$(document).on('keydown', (e) => {
    // Show Log
    if (e.ctrlKey && e.key == 'l') {
        if ($(`log`).is(':visible')) {
            windows.output.close();
        } else {
            windows.output.open();
        }
    }

    if (e.ctrlKey && e.key == 's') {
        if ($(`.settings-container`).is(':visible')) {
            $(`#openSettings`).trigger('click');
        } else {
            $(`#closeSettings`).trigger('click');
        }
    }
});

let windows = {
    output: {
        open: () => {
            $(`log`).fadeIn();
            $(`#closeLog`).fadeIn();
            $(`#closeLog`).fadeIn().css('z-index', '10000000000000');
        },
        close: () => {
            $(`log`).fadeOut();
            $(`#closeLog`).fadeOut().css('z-index', '0').css('display', 'none');
        },
    },
};

let shiftKeyPressed = false;
// Handle Shift Key
$(document).on('keydown', (e) => {
    if (e.shiftKey) {
        shiftKeyPressed = true;
    }
});
$(document).on('keyup', (e) => {
    shiftKeyPressed = false;
});

$(`#openSettings`).on(`click`, () => {
    $(`.settings-container`).fadeIn().css('display', 'flex');
});

$(`#closeSettings`).on(`click`, () => {
    $(`.settings-container`).css('display', 'flex').fadeOut();
});

let settings = {
    open: () => $(`#openSettings`).click(),
    close: () => $(`#closeSettings`).click(),
    func: {
        restart: () => {
            popup
                .fire({
                    title: 'App Restart',
                    html: `<p style="color: red; font-weight: bold;">Please select a restart method.</p>`,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Normal Restart (Refresh)',
                    cancelButtonText: 'Hard Restart',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                    if (result.dismiss) {
                        control.app.restart.hard();
                    }
                });
        },
    },
};

const { default: Swal } = require('sweetalert2');
let serverSettings = require('./serverManager/config.json');
setInterval(() => {
    fetch('./serverManager/config.json')
        .catch((err) => console.log(err))
        .then((response) => response.json())
        .then((data) => {
            serverSettings = data;
        });
}, 1500);

let serverManager = {
    status: false,
    dialog: {
        open: () => {
            $(`#serverIP`).val(`${serverSettings.express.ip}`);
            $(`#serverPort`).val(`${serverSettings.express.port}`);
            $(`#serverPassword`).val(`${serverSettings.express.password}`);

            $(`#remoteServer`).attr('open', '');
        },
    },
    settings: {
        save: () => {
            let newServerSettings = {
                express: {
                    ip: $(`#serverIP`).val() || '0.0.0.0',
                    port: $(`#serverPort`).val(),
                    password: $(`#serverPassword`).val(),
                },
            };

            fs.writeFile(
                './src/serverManager/config.json',
                JSON.stringify(newServerSettings, null, 2),
                (err) => {
                    if (err) {
                        alert(`Server Settings Save Error:\n${err}`);
                    }
                    if (!err) {
                        $(`#remoteServer`).removeAttr('open');
                        toast.success(`Server Settings Saved!`);
                    }
                }
            );
        },
    },
    start: () => {
        fetch('./serverManager/config.json')
            .then((res) => res.json())
            .then((data) => {
                if (data.express.password === 'secure-password') {
                    toast.error('Please Change Server Password!');
                } else {
                    pm2.start(
                        {
                            script: `./src/serverManager/startServer.js`,
                            name: 'scm-remote',
                        },
                        (err) => {
                            if (err) {
                                toast.error('Remote Server Error');
                                alert(`Remote Server Error:\n${err}`);
                            } else {
                                toast.success(
                                    `Remote Server running @ ${serverSettings.express.ip}:${serverSettings.express.port}`
                                );
                                serverManager.status = true;
                            }
                        }
                    );
                }
            });
    },
    stop: () => {
        pm2.stop('scm-remote');
        toast.success(`Remote Server Stopped`);
    },
};

//? Check Server Status
setInterval(() => {
    pm2.list((err, desc) => {
        if (err) {
            throw err;
        }
        if (desc) {
            desc.forEach((element) => {
                if (element.name === 'scm-remote') {
                    if (element.pid != 0) {
                        serverManager.status = true;
                    }
                    if (element.pid == 0) {
                        serverManager.status = false;
                    }
                }
            });

            $(`#start-server`)
                .attr('aria-busy', false)
                .attr('onclick', 'serverManager.start();')
                .removeClass('warn')
                .addClass('success');
        }
    });

    if (serverManager.status == true) {
        $(`#start-server`).hide();
        $(`#stop-server`).show();
    } else {
        $(`#stop-server`).hide();
        $(`#start-server`).show();
    }
}, 2500);

let cadSettings = {
    dialog: {
        open: () => {
            $(`#cadSettings`).attr('open', true);
        },
        close: () => {
            $(`#cadSettings`).attr('open', false);
        },
    },
    commands: {
        reset_node_modules: () => {
            Swal.fire({
                title: 'Reset Node Modules',
                html: `Are you sure you would like to reset SnailyCAD's <code>node_modules</code> directory?`,
                showCancelButton: true,
                confirmButtonText: 'Yeah... I do.',
                cancelButtonText: 'Shoot! Cancel!',
                cancelButtonColor: 'red',
                color: 'white',
                background: 'var(--background-color)',
            }).then((result) => {
                if (result.isConfirmed) {
                    toast.success('Resetting <code>node_modules</code>!');
                    spw(
                        'rmdir /s /q "node_modules" && yarn && echo Node Modules have been reset!'
                    );
                }
            });
        },
    },
};
