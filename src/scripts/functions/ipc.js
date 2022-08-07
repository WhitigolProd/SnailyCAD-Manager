const control = {
    app: {
        close: function (cb) {
            pm2.stop('scm-remote');
            setInterval(() => {
                pm2.list((err, desc) => {
                    if (err) {
                        throw err;
                    }
                    if (desc) {
                        desc.forEach(element => {
                            if (element.name === 'scm-remote') {
                                if (element.pid == 0) {
                                    if (typeof cb == "function") {
                                        cb();
                                    }
                                } else {
                                    console.log('PID Not Zero');
                                }
                            }
                        });
                    }
                })
            }, 200)
        },

        minimize: function () {
            ipc.send('minimize-app');
        },
        restart: {
            normal: () => {
                location.reload();
            },
            hard: () => {
                ipc.send('hard-restart');
            },
        },
        setStatus: (status) => {
            if (status == true) {
                ipc.send('status', true);
            }
            if (status == false) {
                ipc.send('status', false);
            } else if (status != true || false) {
                alert(
                    `APP ERROR:\nInvalid Status Setting\nPlease let us know this error occured in SnailyCAD Support.`
                );
            }
        },
    },
};
