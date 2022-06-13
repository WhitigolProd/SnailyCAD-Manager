const PastebinAPI = require('pastebin-js');
let paste = new PastebinAPI('08e056f81a7241724ced3116a2e08a3d')

// Get Latest App Version
paste.getPaste('F5w07kPv').then((data) => { app.versions.latest = data })

let ver = {
    current: null,
    latest: null,
};

let app = {
    versions: {
        current: require(`${__dirname}/../package.json`).version, // Must be set before releasing each update.
        latest: null, // Sets Dynamically
    },
};

console.log(app.versions.current)

function checkUpdates() {
    //Current Version Check
    (function () {
        let user = require('os').userInfo().username;
        let snailyjson = require(`C:/Users/${user}/Documents/snaily-cadv4/package.json`);

        elements.versions.current.text(`${snailyjson.version}`);
        console.log(`Current Version: ${snailyjson.version}`);
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
            console.log(`Latest Version: ${versions[0].name}`);
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
            let snailyjson = require(`C:/Users/${user}/Documents/snaily-cadv4/package.json`);

            elements.versions.current.text(`${snailyjson.version}`);
            console.log(`Current Version: ${snailyjson.version}`);
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
                console.log(`Latest Version: ${versions[0].name}`);
                elements.versions.latest.text(versions[0].name);
                ver.latest = `${versions[0].name}`;

                CompareVersions();
            });
        })();
    }, 20000)

    // Compare Versions
    function CompareVersions() {
        if (ver.current < ver.latest) {
            elements.versions.current
                .css('color', '#ffa600')
                .append(` (Update <u>${ver.latest}</u> Available)`);
            elements.titlebar.title.append(
                `&nbsp;<span style="color: orange;">(Update <u>${ver.latest}</u> available)</span>`
            );
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
