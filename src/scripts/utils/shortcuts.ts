// * Keyboard Shortcuts
$(document).on('keydown', async (e) => {
    let ctrl = e.ctrlKey;
    let key = (key: string) => {
        return e.key.toLowerCase() == key;
    };

    // * Open Log Output
    if (ctrl && key('l')) {
        modal('#log_output').open();
    }

    // * Open App Settings
    if (ctrl && key('s')) {
        modal('#app_settings').open();
    }
});
