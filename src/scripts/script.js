// On Load
$(function () {
    requirements();
    waitForRequirements();
    checkUpdates();
    selfUpdate();
    $('scripts').remove(); //? Remove Scripts Tag
});

// Core App Functions
const core = {
    reset: () => {
        localStorage.clear();
        location.reload();
    }
}

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
        notif.success({ message: `${msg}`, dismissible: true, });
    },
    error: (msg) => {
        notif.success({ message: `${msg}`, dismissible: true });
    }
}

// Warn of Errors on Extended Loading Times
setTimeout(() => {
    $(`load`).html(`
    <h4 style="color: red;">SnailyCAD Manager Encountered an uncaught error.</h4>
    <p>Below are likely reasons for encountering an uncaught error.</p>

    <ul>
        <li>Incorrect SnailyCAD Directory
            <ul><li>(Installation or Pre-Existing Directory)</li></ul>
        </li>
        <li>Error upon SnailyCAD Installation</li>
        <li>Improperly Configured <code>.env</code> file.</li>
    </ul>
    <hr>
    <span>You can <a href="#" onclick="core.reset();">reset</a> SnailyCAD Manager to repair errors.</span>
    `)
}, 5000);