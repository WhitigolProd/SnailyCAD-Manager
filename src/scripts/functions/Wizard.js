const commandExists = require('command-exists');
const rqm = require('command-exists');

//? Wizard Storage
let wizard = {
    requirements: {
        git: null,
        node: null,
        yarn: null,
        psql: null,
    },

    store: {
        cadDir: null,
        cadPort: null,
        cadAPI: null,
    }
};

//? Display Requirements when PSQL is available
$(() => {
    function ensurePSQLisFound(timeout) {
        var start = Date.now();
        return new Promise(waitForFoo);

        function waitForFoo(resolve, reject) {
            if (wizard.requirements.psql) resolve(wizard.requirements.psql);
            else if (timeout && Date.now() - start >= timeout)
                reject(new Error('timeout'));
            else setTimeout(waitForFoo.bind(this, resolve, reject), 30);
        }
    }
    ensurePSQLisFound(1000000).then(function () {
        if (
            !wizard.requirements.git ||
            !wizard.requirements.node ||
            !wizard.requirements.yarn ||
            !wizard.requirements.psql
        ) {
            $('.requirements').append(
                `<p>GIT: <span data-status="${wizard.requirements.git}"></span></p>`
            );
            $('.requirements').append(
                `<p>NodeJS: <span data-status="${wizard.requirements.node}"></span></p>`
            );
            $('.requirements').append(
                `<p>Yarn: <span data-status="${wizard.requirements.yarn}"></span></p>`
            );
            $('.requirements').append(
                `<p>PostgreSQL: <span data-status="${wizard.requirements.psql}"></span></p>`
            );
            $('.requirements').append(
                `<span style="color: orange;">Please install the required assets, then restart the app to continue.</span>`
            );
            $('#rqLoad').hide();
        } else {
            $('.requirements').hide();
        }
    });
});

$(function requirements() {
    // GIT
    rqm('node')
        .then((command) => {
            wizard.requirements.git = true;
        })
        .catch(() => {
            wizard.requirements.git = false;
        });

    // Node
    rqm('node')
        .then(function (command) {
            wizard.requirements.node = true;
        })
        .catch(() => {
            wizard.requirements.node = false;
        });

    // Yarn
    rqm('yarn')
        .then((command) => {
            wizard.requirements.yarn = true;
        })
        .catch(() => {
            wizard.requirements.yarn = false;
        });

    // PostgreSQL (Requires pgAdmin)
    $(() => {
        exec(
            `where -r C:\\Users\\%username%\\AppData\\Roaming\\ pgadmin4.*`,
            (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    wizard.requirements.psql = false;
                }
                if (stderr) {
                    console.log(stderr);
                    wizard.requirements.psql = false;
                }
                if (stdout) {
                    console.log(stdout);
                    if (stdout.indexOf('pgadmin4.') >= 0) {
                        wizard.requirements.psql = true;
                    } else {
                        wizard.requirements.psql = false;
                    }
                }
            }
        );
    });
});

$(() => {
    if (!config.firstRun || true) {
        console.log(
            '%cFirst Run - Showing Setup Wizard',
            'background-color: darkorange; padding: 0.5em 1em; font-weight: bold;'
        );
        // $(elements.wizard).show();
    }
    if (config.firstRun == 'false') {
        $(elements.wizard).hide();
    }
});

//? Wizard Handler
$(`[data-step="start"] [data-btn="next"]`).on('click', () => {
    if ($(`#installation`).val() == 'install') {
        $(`[data-step="start"]`).hide();
        $(`[data-step="install"]`).show();
    } else if ($(`#installation`).val() == 'exist') {
        $(`[data-step="start"]`).hide();
        $(`[data-step="exist"]`).show();
    }
});

//! New Install Wizard
// Set Installation Directory
$(`[data-step="install"] [data-btn="next"]`).on('click', () => {
    if ($(`#insdir`).val() == ``) {
        alert(`Installation Directory can not be empty`)
    } else {
        wizard.store.cadDir = $('#insdir').val();
        $(`#insDirDis`).text($(`#insdir`).val())

        $(`[data-step="install"`).hide();
        $(`[data-step="ins"]`).show();
    }
})

//! Existing Install Wizard












// Wait for PSQL Variable
function waitFor(variable, callback) {
    var interval = setInterval(function () {
        if (window[variable]) {
            clearInterval(interval);
            callback();
        }
    }, 200);
}
