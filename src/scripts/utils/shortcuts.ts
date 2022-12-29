let keys = {
    shift: false,
};
// * Keyboard Shortcuts
$(document).on('keydown', async (e) => {
    let ctrl = e.ctrlKey;
    let key = (key: string) => {
        return e.key.toLowerCase() == key;
    };

    // * Toggle Shift Key
    if (e.shiftKey) {
        // Set #system_message text to show that shift is pressed
        $('#system_message').html(
            'Shift Key Pressed &mdash; ENV Build will be skipped!'
        );
        return (keys.shift = true);
    }

    // * Open Log Output
    if (ctrl && key('l')) {
        modal('#log_output').open();
    }

    // * Open App Settings
    if (ctrl && key('s')) {
        modal('#app_settings').open();
    }

    if (ctrl && key('r')) {
        e.preventDefault();
        api.post('/start', {}, (data, err) => {
            if (err) {
                return console.error(err);
            }
            console.log(data);
        });
    }

    if (ctrl && key('t')) {
        e.preventDefault();
        if (client_status && api_status && !cadLoading) {
            api.post('/stop', {}, (data, err) => {
                if (err) {
                    return console.error(err);
                }
                console.log(data);
            });
            return;
        }
        toast.error(`Can't stop CAD Process!`);
    }

    if (e.code == '123') {
        ipc.send('devTools');
    }
});

// * Key Releases
$(document).on('keyup', (e) => {
    if (e.key == 'Shift') {
        // Set #system_message text to show that shift is released
        $('#system_message').html('Shift Key Released');
        return (keys.shift = false);
    }
});
