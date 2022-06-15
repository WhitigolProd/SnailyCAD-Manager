const PastebinAPI = require('pastebin-js');
let paste = new PastebinAPI('08e056f81a7241724ced3116a2e08a3d')

let ver = {
    current: null,
    latest: null,
};

function checkUpdates() {
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
    }, 20000)

    // Compare Versions
    function CompareVersions() {
        if (ver.current != ver.latest) {
            elements.versions.current
                .css('color', '#ffa600')
                .append(` (Update <u>${ver.latest}</u> Available)`);
            console.log(
                `%cVersion Mismatch - Update Available`,
                `background: red; font-weight: bold; padding: 2px 5px;`
            );
        } else {
            elements.versions.current
                .css('color', 'lime')
                .append(' (Up to Date)');
            console.log(
                `%cVersion Match - No Updates Available`,
                `background: green; font-weight: bold; padding: 2px 5px;`
            );
        }
        HandleUpdateButton();

        $(`#loadScreen`).fadeOut();
    }
}

// Self Updates
function selfUpdate() {
    if (config.firstRun) {
        exec(`git init && git remote add origin https://github.com/WhitigolProd/scm-updater.git`, { cwd: __dirname })
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

        if (app.versions.latest > app.versions.current) {
            $(`update`).show();
            $(`#titleAlt`).html(`&nbsp;<span style="color: orange;">(Update ${app.versions.latest} Available)</span>`)
        } else {
            $(`update`).hide();
        }
    }, 1000)
}

$(`#noUpdate`).on(`click`, () => {
    $(`update`).hide();
})

$(`#appUpdate`).on(`click`, () => {
    control.app.minimize();
})