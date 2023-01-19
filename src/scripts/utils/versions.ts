let versions = {
    app: null,
    cad: null,
};

let updateDownloadUrl: string;

const checkAppVersion = async () => {
    await $.get(
        'https://api.github.com/repos/WhitigolProd/SnailyCAD-Manager/releases'
    )
        .then((data) => {
            // @ts-expect-error
            let current = require(fromRoot('/package.json')).version;
            versions.app = current;
            let latest = data[0].tag_name;
            updateDownloadUrl = data[0].assets[0].browser_download_url;

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
            ipc.send('popup', {
                title: 'Update Check Failed',
                message:
                    'Could not check for app updates.\nThis is likely due to GitHub API rate limiting.',
            });
            console.error(err);
            log('Could not check for app updates.', 'error');
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
                versions.cad = v;
                cad.version.current = v;
                $('#sc_version').text('v' + v);
                await checkLatest();
            }
        );
        const checkLatest = async () => {
            await $.get(
                'https://api.github.com/repos/SnailyCAD/snaily-cadv4/releases'
            )
                .then(async (data) => {
                    let v = data[0].tag_name;
                    $('#cad_notes #notes').html(
                        mdConvert.makeHtml(data[0].body)
                    );
                    cad.version.latest = v;

                    await compare();
                })
                .catch((err) => {
                    log('Could not check for CAD updates.', 'error');
                    console.error(err);
                });
        };

        const compare = async () => {
            if (cad.version.current < cad.version.latest) {
                $('#sc_latest').html(`
                    <span class="text-orange-500">(v${cad.version.latest} is available)</span>
                    <span onclick="modal('#cad_notes').open();" class="cursor-pointer text-blue-500 hover:text-blue-400 ml-1 text-xs !animate-none">See what's new</span>
                    `);
                $('#update_cad').removeClass('hidden');
                log('CAD Version out of date!', 'warning');
                return;
            } else {
                log('CAD Version up to date!', 'success');
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

// When the update button is clicked, send the update request to the API.
$(document).on('click', '#update_cad', () => {
    api.post('/update', {}, (data, err) => {
        if (err) {
            return log(err, 'error');
        }
        log(data.message, 'success');
    });
});

$(document).on('click', '#pre_update_cad', () => {
    api.post('/update', {}, (data, err) => {
        if (err) {
            return log(err, 'error');
        }
        log(data.message, 'success');
    });
});
