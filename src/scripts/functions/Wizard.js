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

//? Verify Requirements
function verifyReq() {
    (function () {
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
            $(`.requirements`).append(
                `<div style="margin-top: 10px;"
                class="sm-btn blue raise"
                onclick="window.location.reload();"
            >
                <span class="material-icons-outlined">refresh</span>
                <span>Restart</span>
            </div>`
            )
            $('#rqLoad').hide();
        } else {
            $('.requirements').hide();
        }
    });
};

function requirements() {
    // GIT
    rqm('git')
        .then((command) => {
            wizard.requirements.git = true;
            log.add(`Req: GIT Passed`, 0);
        })
        .catch(() => {
            wizard.requirements.git = false;
            log.add(`Req: GIT Failed`, 1);
        });

    // Node
    rqm('node')
        .then(function (command) {
            wizard.requirements.node = true;
            log.add(`Req: NODE Passed`, 0);
        })
        .catch(() => {
            wizard.requirements.node = false;
            log.add(`Req: NODE Failed`, 1);
        });

    // Yarn
    rqm('yarn')
        .then((command) => {
            wizard.requirements.yarn = true;
            log.add(`Req: YARN Passed`, 0);
        })
        .catch(() => {
            wizard.requirements.yarn = false;
            log.add(`Req: YARN Failed`, 1);
        });

    // PostgreSQL (Requires pgAdmin)
    try {
        if (fs.existsSync(`C:\\Users\\${uuid}\\AppData\\Roaming\\pgadmin\\pgadmin4.log`)) {
            wizard.requirements.psql = true;
            log.add(`Req: PSQL Passed`, 0)
        }
        else {
            wizard.requirements.psql = false;
            log.add(`Req: PSQL Failed`, 1)
        }
    } catch (err) {
        console.error(err)
    }

    waitForRequirements();
};

$(() => {
    if (!config.firstRun || config.firstRun == 'true') {
        log.add(
            '%cFirst Run - Showing Setup Wizard',
            'background-color: darkorange; padding: 0.5em 1em; font-weight: bold;'
        );
        $(elements.wizard).show();
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
    }
    if ($(`#insdir`).val().indexOf('/') == -1 || $(`#insdir`).val().indexOf(';') >= 0) {
        alert(`
        The directory input is invalid\n
        • Make sure you have not accidentally included a semi-colon in your directory\n
        • Make sure your directory points to a Folder inside a Drive, and not just a Drive Directory\n
          (Can NOT be directly in the C:/ Drive!)
        `)
    }
    else {
        wizard.store.cadDir = $('#insdir').val();
        $(`#insDirDis`).text($(`#insdir`).val())

        $(`[data-step="install"`).hide();
        $(`[data-step="ins"]`).show();
    }
})

// Installation
$(`[data-step="ins"] [data-btn="next"]`).on('click', () => {
    $(`[data-step="ins"] .inner h2`).hide();
    $(`[data-step="ins"] [data-btn="next"]`).hide();
    $(`[data-step="ins"] .inner #insinfo`).hide();
    $(`[data-step="ins"] .inner`).append(`<p aria-busy="true">Installation In Progress - Installing to <code>${wizard.store.cadDir}</code></p>`)
    $(`[data-step="ins"] .inner`).append(`<p><b>DO NOT</b> close or restart the app while the installation is in progress.</p>`)
    $(`[data-step="ins"] .inner`).append(`<p>The manager will reset once installation is complete. View the log output by pressing <code>CTRL</code> + <code>L</code>.</p>`)
    wz(`git clone https://github.com/SnailyCAD/snaily-cadv4.git && cd snaily-cadv4 && yarn && copy .env.example .env`, wizard.store.cadDir);
})

//! Existing Install Wizard













function wz(cmd, wd) {
    let command = spawn(cmd, [], { cwd: `${wd}`, shell: true });

    command.stdout.on('data', (stdout) => {
        log.add(stdout.toString(), 0);
        if (stdout.toString().indexOf('1 file(s) copied.') >= 0) {
            console.log('1 file(s) copied')
        }
    });

    command.stderr.on('data', (stderr) => {
        log.add(stderr.toString(), 1);
    });
}

// Wait for requirements to be checked
function waitForRequirements() {
    if (wizard.requirements.git != null && wizard.requirements.node != null && wizard.requirements.psql != null && wizard.requirements.yarn != null) {
        verifyReq();
    }
    else {
        setTimeout(waitForRequirements, 250);
    }
};