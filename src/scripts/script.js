//! jQuery Initialization - DO NOT TOUCH THIS SECTION !//
window.$ = window.jQuery = require('jquery');
//! ------------------------------------------------- !//

// Add Powershell Support - DO NOT TOUCH THIS SECTION
const { exec, spawn } = require('child_process');
const os = require('os');
const uuid = os.userInfo().username;

// On Load
$(function () {
    checkUpdates();
    selfUpdate();
    $('scripts').remove(); //? Remove Scripts Tag
});

// Add Log Functions
const log = {
    add: (data, type, style) => {
        if (type == 0 /* Stdout */) {
            $(`log`).prepend(`<out style="${style}">${data}</out>`)
            console.log(`%c${data}`, style);
        }
        if (type == 1 /* Stderr */) {
            $(`log`).prepend(`<out style="color: orange; ${style}">${data}</out>`)
            console.log(`%c${data}`, style);
        }
        if (type == 2 /* Error */) {
            $(`log`).prepend(`<out style="color: red; ${style}">${data}</out>`)
            console.log(`%c${data}`, style);
        }
        if (type == 3 /* Cyan */) {
            $(`log`).prepend(`<out style="color: cyan; ${style}">${data}</out>`)
        }
        if (type == 4 /* Success */) {
            $(`log`).prepend(`<out style="color: lime; ${style}">${data}</out>`)
        }
        // else if (type != 0 || 1 || 2) {
        //     $(`log`).prepend(`<out style="color: cyan; ${style}">${data}</out>`)
        //     console.log(`%c${data}`, style, '');
        // }
    },

    clear: () => {
        $(`log`).html(``);
    }
}