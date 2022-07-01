// On Load
$(function () {
    preload.checkEnvStatus();
    requirements();
    waitForRequirements();
    checkUpdates();
    selfUpdate();
    $('scripts').remove(); //? Remove Scripts Tag
});

// Core App Functions
const core = {
    reset: () => {
        popup
            .fire({
                title: 'Are you sure?',
                html: `<p style="color: red; font-weight: bold;">An app reset will erase ALL DATA, are you sure you want to continue?</p>`,
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Reset App (Erases All Data)',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    popup
                        .fire({
                            title: 'App Reset',
                            confirmButtonText: `Restart App`,
                            html: `<span>Your app data has been deleted. Please restart the app to continue<span>`,
                            icon: 'success',
                        })
                        .then(() => {
                            location.reload();
                        });
                }
            });
    },

    restart: (html, showCancelButton) => {
        popup
            .fire({
                title: 'Restart App?',
                html: `${html}`,
                icon: 'warning',
                showCancelButton: showCancelButton,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Restart App',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
    },
};

// Add Log Functions
const log = {
    add: (data, type, style) => {
        if (type == 0 /* Stdout */) {
            $(`log`).prepend(`<out style="${style}">${data}</out>`);
            console.log(`%c${data}`, style);
        }
        if (type == 1 /* Stderr */) {
            $(`log`).prepend(
                `<out style="color: orange; ${style}">${data}</out>`
            );
            console.log(`%c${data}`, style);
        }
        if (type == 2 /* Error */) {
            $(`log`).prepend(`<out style="color: red; ${style}">${data}</out>`);
            console.log(`%c${data}`, style);
        }
        if (type == 3 /* Cyan */) {
            $(`log`).prepend(
                `<out style="color: cyan; ${style}">${data}</out>`
            );
            console.log(`%c${data}`, style);
        }
        if (type == 4 /* Success */) {
            $(`log`).prepend(
                `<out style="color: lime; ${style}">${data}</out>`
            );
            console.log(`%c${data}`, style);
        }
    },

    clear: () => {
        $(`log`).html(``);
    },
};

const toast = {
    success: (msg) => {
        notif.success({ message: `${msg}`, dismissible: true });
    },
    error: (msg) => {
        notif.error({ message: `${msg}`, dismissible: true });
    },
};

// Warn of Errors on Extended Loading Times
setTimeout(() => {
    $(`load`).html(`
    <h4 style="color: red;">SnailyCAD Manager Encountered an uncaught error.</h4>
    <p>Below are likely reasons for encountering an uncaught error.</p>

    <ul>
        <li>Incorrect SnailyCAD Directory
            <ul>
                <li>(Installation or Pre-Existing Directory)</li>
            </ul>
        </li>
        <li>Error upon SnailyCAD Installation</li>
        <li>Deleted/Moved SnailyCAD Directory</li>
    </ul>
    <hr>
    <span>You can <a href="#" onclick="core.reset();">reset</a> SnailyCAD Manager to repair errors.</span>
    `);
}, 5000);

const preload = {
    checkEnvStatus: () => {
        if (localStorage.envPending == `true`) {
            log.add(`ENV is pending`, 1);
            $(`env`).prepend(
                `<p style="color: orange">You must fill out the ENV file for first run!</p>`
            );
            $(`#editEnv`).click();
        }
        if (!localStorage.envPending) {
            log.add(`ENV is not pending`, 0);
        }
    },
};
