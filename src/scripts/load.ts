/*
    !   Nothing in this file will be registered in intellisense (VSCode)
    !   To register modules in intellisense, use CommonJS syntax.
*/

import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

// * Import scripts to HTML
let scriptImports = [
    '/app/scripts/utils/utils.js',
    '/app/scripts/utils/toasts.js',
    '/app/scripts/utils/storage.js',
    '/app/scripts/utils/shortcuts.js',
    '/app/scripts/utils/requirements.js',
    '/app/scripts/utils/versions.js',
    '/app/scripts/utils/wizard.js',
    '/app/scripts/utils/env.js',
    '/app/scripts/utils/cad.js',
    '/app/scripts/utils/api/api.js',
    '/app/scripts/utils/remote/server.js',
    '/app/scripts/utils/remote/settings.js',
    '/app/scripts/utils/webhook.js',
    '/app/scripts/utils/appUpdate.js',
    '/app/scripts/utils/ipc.js',
];

scriptImports.forEach((script) => {
    $(`head`).append(`<script src=".${script}" defer></script>`);
    console.log(`${script} — Applied to Head`);
});

// * On page load
$(async () => {
    setInterval(() => {
        $(`.mio`).removeClass('mio').addClass('material-symbols-outlined');
    }, 150);
    ipcRenderer.send('focus');
    await checkRequirements();
    const devConsoleJokes = [
        "Hey there, code sleuth! Looks like you're checking out the inner workings of this app. Just don't let all these bugs bite!",
        'Well well, what do we have here? The master of the console has arrived! Just watch out for all the spaghetti code in here.',
        "You must be a dev, because you're peeking behind the scenes of this app! Just don't get lost in all the mess of code.",
        "Welcome to the console, the land of endless bugs and unreadable code. But hey, at least you're having a good time, right?",
        "Oh, you're inspecting the code? I hope you brought your debugging skills, because there's a lot of messy code in here.",
        "The dev console, where the bugs are plenty and the code is confusing. But don't worry, you're up to the challenge, right?",
        "You're viewing the console, the land of mystery and code. Just make sure you don't get stuck in the web of bugs and errors!",
        "The console, where the magic happens and the bugs arise. Just don't let all the mess of code bring you down!",
        "Well, well, well, look who's checking out the inner workings of this app. Just watch out for all the code traps and bugs!",
        "The dev console, where the code is messy and the bugs are plenty. But at least you're brave enough to face them, right?",
    ];

    console.log(
        `%c${
            devConsoleJokes[Math.floor(Math.random() * devConsoleJokes.length)]
        }`,
        'color: #fff; background: #000; padding: 5px; border-radius: 5px;'
    );
});

// * Import HTML Partials
const includeHTML = () => {
    var z, i, elmnt: any, file, xhttp;
    z = document.getElementsByTagName('*');
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute('partial');
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = 'Page not found.';
                    }
                    elmnt.removeAttribute('partial');
                    includeHTML();
                }
            };
            xhttp.open('GET', file, true);
            xhttp.send();
            return;
        }
    }
};

// * Execute the function to inject HTML partials.
includeHTML();
