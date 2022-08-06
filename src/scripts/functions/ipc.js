const control = {
    app: {
        close: function () {
            ipc.send('close-app');
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
