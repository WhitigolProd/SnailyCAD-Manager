let ver = {
    current: null,
    latest: null,
};

function checkUpdates() {
    if (localStorage.length == 0) {
        $(`load`).hide();
        $(`.wizard`).show();
    }

    if (localStorage.length > 0) {
        //Current Version Check
        (function () {
            let user = require('os').userInfo().username;
            let snailyjson = require(`${config.cadDir}/package.json`);

            elements.versions.current.text(`${snailyjson.version}`);
            ver.current = `${snailyjson.version}`;
        })();

        // Latest Version Check
        (function () {
            let ghpath = 'SnailyCAD/snaily-cadv4';
            let api = `https://api.github.com/repos/${ghpath}/tags`;

            $.get(api).done(function (data) {
                var versions = data.sort(function (v1, v2) {
                    return semver.compare(v2.name, v1.name);
                });
                elements.versions.latest.text(versions[0].name);
                ver.latest = `${versions[0].name}`;

                CompareVersions();
            });
        })();

        // Version Check every 20 seconds.
        setInterval(() => {
            //Current Version Check
            (function () {
                let user = require('os').userInfo().username;
                let snailyjson = require(`${config.cadDir}/package.json`);

                elements.versions.current.text(`${snailyjson.version}`);
                ver.current = `${snailyjson.version}`;
            })();

            // Latest Version Check
            (function () {
                let ghpath = 'SnailyCAD/snaily-cadv4';
                let api = `https://api.github.com/repos/${ghpath}/tags`;

                $.get(api).done(function (data) {
                    var versions = data.sort(function (v1, v2) {
                        return semver.compare(v2.name, v1.name);
                    });
                    elements.versions.latest.text(versions[0].name);
                    ver.latest = `${versions[0].name}`;

                    CompareVersions();
                });
            })();
        }, 20000);

        // Compare Versions
        function CompareVersions() {
            if (ver.current != ver.latest) {
                elements.versions.current
                    .css('color', '#ffa600')
                    .append(` (Update <u>${ver.latest}</u> Available)`);
                log.add(
                    `%cVersion Mismatch - Update Available`,
                    `background: red; font-weight: bold; padding: 2px 5px;`
                );
            } else {
                elements.versions.current
                    .css('color', 'lime')
                    .append(' (Up to Date)');
                log.add(
                    `%cVersion Match - No Updates Available`,
                    `background: green; font-weight: bold; padding: 2px 5px;`
                );
            }
            HandleUpdateButton();

            $(`#loadScreen`).fadeOut();
        }
    }
}

// Self Updates
function selfUpdate() {
    if (config.firstRun) {
        exec(
            `git init && git remote add origin https://github.com/WhitigolProd/scm-updater.git`,
            { cwd: __dirname }
        );
    }

    setInterval(() => {
        (function () {
            let ghpath = 'WhitigolProd/scm-updater';
            let api = `https://api.github.com/repos/${ghpath}/tags`;

            $.get(api).done(function (data) {
                var versions = data.sort(function (v1, v2) {
                    return semver.compare(v2.name, v1.name);
                });
                elements.versions.latest.text(versions[0].name);
                app.versions.latest = `${versions[0].name}`;
            });
        })();

        if (
            app.versions.latest > app.versions.current &&
            !app.versions.skipUpdate
        ) {
            $(`update`).show();
            $(`#titleAlt`).html(
                `&nbsp;<span style="color: orange;">(Update ${app.versions.latest} Available)</span>`
            );
        }
        if (app.versions.latest > app.versions.current) {
            $(`#mVer span`).html(
                `<span style="color: orange;">${app.versions.current} (${app.versions.latest} Available)</span>`
            );
        } else {
            $(`update`).hide();
            $(`#mVer span`).html(
                `<span style="color: lime;">${app.versions.current} (Up to Date)</span>`
            );
        }
    }, 1000);
}

function updateApp(cmd, wd) {
    let command = spawn(cmd, [], { cwd: `${wd}`, shell: true });

    command.stdout.on('data', (stdout) => {
        log.add(`${stdout.toString()}`, 0);
        if (stdout.toString().indexOf('File(s) copied') >= 0) {
            log.add(`${stdout.toString()}`, 0);
            ipc.send(`hard-restart`);
        }
        if (stdout.toString().indexOf('fatal:') >= 0) {
            log.add(`Fatal Error: ${stdout.toString()}`, 2);
            toast.error(`Fatal Error on Update\n Check Logs`);
        }
    });

    command.stderr.on('data', (stderr) => {
        addToOutputStream(stderr.toString(), 'b');
        log.add(stderr.toString());
    });
}
