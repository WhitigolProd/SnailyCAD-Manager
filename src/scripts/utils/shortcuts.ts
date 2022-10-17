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
});

// * Key Releases
$(document).on('keyup', (e) => {
    if (e.key == 'Shift') {
        return (keys.shift = false);
    }
});
