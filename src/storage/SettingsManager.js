// Handle Keyboard Shortcuts
$(document).on('keydown', (e) => {
    // Show Log
    if (e.ctrlKey && e.key == 'l') {
        if ($(`log`).is(':visible')) {
            $(`log`).fadeOut();
        } else {
            $(`log`).fadeIn();
        }
    }

    if (e.ctrlKey && e.key == 's') {
        if ($(`.settings-container`).is(':visible')) {
            $(`settings-container`).fadeOut();
        } else {
            $(`.settings-container`).fadeIn();
        }
    }
});

$(`#openSettings`).on(`click`, () => {
    $(`.settings-container`).fadeIn();
});

$(`#closeSettings`).on(`click`, () => {
    $(`.settings-container`).fadeOut();
});
