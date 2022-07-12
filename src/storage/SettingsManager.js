// Handle Keyboard Shortcuts
$(document).on('keydown', (e) => {
    // Show Log
    if (e.ctrlKey && e.key == 'l') {
        if ($(`log`).is(':visible')) {
            $(`log`).fadeOut();
            $(`#closeLog`).fadeOut().css('z-index', '0').css('display', 'none');
        } else {
            $(`log`).fadeIn();
            $(`#closeLog`).fadeIn();
            $(`#closeLog`).fadeIn().css('z-index', '10000000000000');
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
    $(`.settings-container`).fadeIn();
});

$(`#closeSettings`).on(`click`, () => {
    $(`.settings-container`).fadeOut();
});
