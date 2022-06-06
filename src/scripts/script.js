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
    $('scripts').remove(); //? Remove Scripts Tag
});
