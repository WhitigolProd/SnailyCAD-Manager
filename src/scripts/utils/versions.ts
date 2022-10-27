const checkAppVersion = async () => {
    await $.get(
        'https://api.github.com/repos/WhitigolProd/SnailyCAD-Manager/releases'
    )
        .then((data) => {
            // @ts-expect-error
            let current = require(fromRoot('/package.json')).version;
            let latest = data[0].tag_name;

            if (current < latest) {
                log(
                    'App Versions do NOT match — New Version Available',
                    'error'
                );
                $('#app_current_version')
                    .text(current)
                    .css('color', 'orange')
                    .append(`<i class="mio">warning</i>`);
                $('#app_latest_version').text(latest);
                modal('#d-app-version').open();
            }

            if (current > latest) {
                log('App version check skipped: Development Version', 'info');
            }
        })
        .catch((err) => {
            alert(err);
            throw new Error(err);
        });

    setTimeout(checkAppVersion, 1800000); // Check every 30 minutes for a new version.
};

// * Get SnailyCAD Version

let cad = {
    version: {
        current: '',
        latest: '',
    },
};

const cadCheck = async () => {
    if (storage('cadDir').read()) {
        $.get(storage('cadDir').read() + '\\package.json').then(
            async (data) => {
                let v = data.version;
                cad.version.current = v;
                $('#sc_version').text('v' + v);
                await checkLatest();
            }
        );
        const checkLatest = async () => {
            await $.get(
                'https://api.github.com/repos/SnailyCAD/snaily-cadv4/releases'
            ).then(async (data) => {
                let v = data[0].tag_name;
                cad.version.latest = v;

                await compare();
            });
        };

        const compare = async () => {
            if (cad.version.current < cad.version.latest) {
                $('#sc_latest')
                    .text(`(v${cad.version.latest} available)`)
                    .css('color', 'orange');
                $('#update_cad').show();
                log('CAD Versions out of Sync — Update Available', 'warning');
                return;
            }
        };
    } else {
        return log(
            'Error: Could not check CAD Version since a CAD Directory was not specified.\nThis is likely because the wizard has not been completed.',
            'error'
        );
    }
    setTimeout(cadCheck, 1800000); // Check every 30 minutes
};
