const rqm = require('command-exists');

//? Wizard Storage
let wizard = {
    requirements: {
        git: null,
        node: null,
        yarn: null,
        psql: null,
        ready: null,
    },

    store: {
        cadDir: null,
        cadPort: null,
        cadAPI: null,
    },
};

//? Verify Requirements
function verifyReq() {
    if (
        !wizard.requirements.git ||
        !wizard.requirements.node ||
        !wizard.requirements.yarn ||
        !wizard.requirements.psql
    ) {
        $(`.requirements`).html(`
        <h2>System Requirements Results</h2>
        <p>GIT: <span data-status="${wizard.requirements.git}"></span></p>
        <p>NodeJS: <span data-status="${wizard.requirements.node}"></span></p>
        <p>Yarn: <span data-status="${wizard.requirements.yarn}"></span></p>
        <p>PostgreSQL: <span data-status="${wizard.requirements.psql}"></span></p>

        <span style="color: orange;">Please install the required assets, then restart the app to continue.</span>
        
        <div style="margin-top: 10px;" class="sm-btn lnk raise" onclick="exec('start https://cad-manager.cossys.tk/snailycad-manager/requirements')">
                <span class="material-icons-outlined">article</span>
                <span>Requirements Documentation</span>
        </div>

        <div style="margin-top: 10px;" class="sm-btn blue raise" onclick="window.location.reload();">
                <span class="material-icons-outlined">refresh</span>
                <span>Restart</span>
        </div>
        `);

        $('#rqLoad').hide();
    } else {
        $('.requirements').hide();
    }
}

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
        if (fs.existsSync(`C:/Users/${uuid}/AppData/Roaming/pgadmin/`)) {
            wizard.requirements.psql = true;
            log.add(`Req: PSQL Passed`, 0);
        } else {
            wizard.requirements.psql = false;
            log.add(`Req: PSQL Failed`, 1);
        }
    } catch (err) {
        console.error(err);
    }

    waitForRequirements();
}

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
// Handle Retrieving Install Directory
$(`#insdir`).on('click', () => {
    ipc.send('selectDir', 'Select Installation Directory');
    ipc.on('callback', (e, arg) => {
        if (arg == '') {
            $(`#insRes`).text(`ERROR: Canceled.`).css('color', 'red');
        } else if (arg != ``) {
            $(`#insRes`).text(arg).css('color', 'lime');
            wizard.store.cadDir = `${arg}`;
        }
    });
});

// Set Installation Directory
$(`[data-step="install"] [data-btn="next"]`).on('click', () => {
    if (!wizard.store.cadDir) {
        toast.error('ERROR: Installation Directory must be specified.');
    } else if (wizard.store.cadDir) {
        if (fs.existsSync(`${wizard.store.cadDir}/snaily-cadv4`)) {
            toast.error('ERROR: Directory Already Exists!');
            return;
        }
        if (fs.existsSync(`${wizard.store.cadDir}/package.json`)) {
            toast.error(
                'ERROR: Directory already has SnailyCAD or another app installed.'
            );
            return;
        } else {
            $(`[data-step="install"]`).hide();
            $(`#insDirDis`).text(`${wizard.store.cadDir}`);
            $(`[data-step="ins"]`).show();
        }
    }
});

// Installation
$(`[data-step="ins"] [data-btn="next"]`).on('click', () => {
    $(`[data-step="ins"] .inner h2`).hide();
    $(`[data-step="ins"] [data-btn="next"]`).hide();
    $(`[data-step="ins"] .inner #insinfo`).hide();
    $(`[data-step="ins"] .inner`).append(
        `<p aria-busy="true">Installation In Progress - Installing to <code>${wizard.store.cadDir}</code></p>`
    );
    $(`[data-step="ins"] .inner`).append(
        `<p><b>DO NOT</b> close or restart the app while the installation is in progress.</p>`
    );
    $(`[data-step="ins"] .inner`).append(
        `<p>The manager will reset once installation is complete. View the log output by pressing <code>CTRL</code> + <code>L</code>.</p>`
    );
    wz(
        `git clone https://github.com/SnailyCAD/snaily-cadv4.git && cd snaily-cadv4 && yarn && copy .env.example .env && yarn turbo run build`,
        wizard.store.cadDir
    );
});

//! Existing Install Wizard
$(`#existdir`).on('click', () => {
    ipc.send('selectDir', 'Select Existing SnailyCAD Installation');
    ipc.on('callback', (e, arg) => {
        if (arg == '') {
            $(`#exRes`).text(`ERROR: Canceled.`).css('color', 'red');
        } else if (arg != ``) {
            $(`#exRes`).text(arg).css('color', 'lime');
            wizard.store.cadDir = `${arg}`;
        }
    });
});

$(`[data-step="exist"] [data-btn="next"]`).on('click', () => {
    try {
        if (fs.existsSync(`${wizard.store.cadDir}/package.json`)) {
            if (!wizard.store.cadDir) {
                toast.error('ERROR: Installation Directory must be specified.');
            } else if (wizard.store.cadDir) {
                $(`[data-step="exist"]`).hide();
                $(`#exDirDis`).text(`${wizard.store.cadDir}`);
                $(`[data-step="ex"]`).show();
            }
        } else {
            toast.error(
                `Selected Directory does not contain a <code>package.json</code> file`
            );
        }
    } catch (err) {
        console.error(err);
    }
});

$(`[data-step="ex"] [data-btn="next"]`).on('click', () => {
    $(`[data-step="ex"] .inner`).html(`
    <h2 aria-busy="true">Setup in Progress</h2>
    <p><b>DO NOT</b> close or restart the app while the installation is in progress.</p>
    <p>The manager will prompt to restart when setup is complete.</p>
    `);

    setConfig.cadDir(`${wizard.store.cadDir}`);
    setConfig.firstRun(false);
    localStorage.setItem(`envPending`, true);

    core.restart(
        `The setup has completed. Please restart the app to continue.`,
        false
    );
});

//? Wizard Functions
function wz(cmd, wd) {
    let command = spawn(cmd, [], { cwd: `${wd}`, shell: true });

    command.stdout.on('data', (stdout) => {
        log.add(stdout.toString(), 0);
        if (
            stdout.toString().indexOf('Tasks') >= 0 &&
            stdout.toString().indexOf('successful') >= 0 &&
            stdout.toString().indexOf(`total`) >= 0
        ) {
            // Set Storage
            setConfig.cadDir(`${wizard.store.cadDir}/snaily-cadv4`);
            setConfig.firstRun(false);
            localStorage.setItem(`envPending`, true);

            $(`msg`).html(`
            <h2>SnailyCAD Installed!</h2>
            <p>SnailyCAD Has been successfully installed.</p>
            <p>To continue, you <b>must</b> restart the app.</p>
            <div class="md-btn blue raise" onclick="location.reload();"><span class="material-icons-outlined">refresh</span><span>Restart Manager</span></div>
            `);
            $(`msg`).show();
        }
    });

    command.stderr.on('data', (stderr) => {
        log.add(stderr.toString(), 1);
    });
}

// Wait for requirements to be checked
function waitForRequirements() {
    if (
        wizard.requirements.git != null &&
        wizard.requirements.node != null &&
        wizard.requirements.psql != null &&
        wizard.requirements.yarn != null
    ) {
        log.add('Requirement Check Complete', 3);
        wizard.requirements.ready = true;
        verifyReq();
    } else {
        setTimeout(waitForRequirements, 250);
    }
}
