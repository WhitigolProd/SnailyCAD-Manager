let notif = new Notyf();
let vars = {
    api: {
        result: null,
    },
    console: {
        log: (data, style) => {
            console.log(
                `%c[SnailyCAD Remote]: %c${data}`,
                'color: green;',
                `${style}`
            );
        },
        error: (data, style) => {
            console.error(
                `%c[SnailyCAD Remote]: %c${data}`,
                'color: green;',
                `${style}`
            );
        },
    },
    cad: {
        start: () => {
            vars.console.log('Sending Start Request');
            vars.toast.success(`Sending Start Request`);
            fetch('/api/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
                .catch((err) => {
                    vars.console.error(err);
                })
                .then((res) => {
                    vars.console.log(
                        `Start Request Return Status: ${res.status} (${res.statusText})`,
                        'color: lightgreen;'
                    );
                });
        },
        stop: () => {
            vars.console.log('Sending Stop Request');
            vars.toast.success(`Sending Stop Request`);
            fetch('/api/stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
                .catch((err) => {
                    vars.console.error(err);
                })
                .then((res) => {
                    vars.console.log(
                        `Stop Request Return Status: ${res.status} (${res.statusText})`,
                        'color: lightgreen;'
                    );
                });
        },
    },
    toast: {
        success: (content) => {
            notif.success({
                message: `${content}`,
                dismissible: true,
            });
        },
        error: (content) => {
            notif.error({
                message: `${content}`,
                dismissible: true,
            });
        },
    },
};
