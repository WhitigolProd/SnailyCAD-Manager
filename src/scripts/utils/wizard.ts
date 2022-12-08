// * Wizard Storage
let wizardStorage = {
    cadDir: '',
    installType: '',
};

// * Hide if Complete
let wizardComplete = false;

const loadWizard = async () => {
    if (storage('wizardComplete').read() == 'true') {
        wizardComplete = true;
        modal('#setup_wizard').close();
    } else {
        wizardComplete = false;
        modal('#setup_wizard').open();
    }
};

// * Home
$(document).on('click', '.wizard_steps .home .wizard_next', () => {
    $('.home').slideToggle().next().delay(400).slideToggle();
});

// * Installation Type
$(document).on('click', '.wizard_steps .type .wizard_next', () => {
    let type = $('#install_type').val();

    if (type == 'null') {
        return toast.warning('Invalid Selection');
    }
    if (type == 'new') {
        wizardStorage.installType = type;
        $('.type').slideToggle();
        $('.install').delay(400).slideToggle();
    }
    if (type == 'existing') {
        wizardStorage.installType = type;
        $('.type').slideToggle();
        $('.existing').delay(400).slideToggle();
    }
});

// * Reset Wizard
$(document).on('click', '.wizard_prev', () => {
    let beginning = $('.wizard_steps article')[0];
    $('.wizard_steps article:visible').slideToggle();
    $(beginning).delay(400).slideToggle();
});

// * Type: New Installation
$(document).on('click', '#select_new_install', async () => {
    ipc.send('directory', 'Choose Installation Directory');
    ipc.on('dir-cb', (e, arg) => {
        if (arg == '') {
            $('#select_new_install span')
                .text('Select Directory (Canceled)')
                .css('color', 'orange');
        } else {
            $('#select_new_install span')
                .text(`${arg.replaceAll('\\', '/')}`)
                .css('color', ''); // Reset Color
            wizardStorage.cadDir = arg;
        }
    });
});

// * Existing Setup
$(document).on('click', '#select_existing_setup', async () => {
    ipc.send(
        'directory',
        'Choose SnailyCAD Directory (MUST CONTAIN package.json)'
    );
    ipc.on('dir-cb', (e, arg) => {
        if (arg == '') {
            $('#select_existing_setup span')
                .text('Select Directory (Canceled)')
                .css('color', 'orange');
        } else {
            $('#select_existing_setup span')
                .text(`${arg.replaceAll('\\', '/')}`)
                .css('color', ''); // Reset Color
            wizardStorage.cadDir = arg;
        }
    });
});

// * Verify Existing Installation
$(document).on('click', '.existing:visible .wizard_next', () => {
    if (wizardStorage.cadDir == '') {
        toast.warning('Please select a directory');
        return;
    }
    fs.exists(
        path.join(wizardStorage.cadDir, '/package.json'),
        (exists: boolean) => {
            if (exists) {
                fs.readFile(
                    path.join(wizardStorage.cadDir, '/package.json'),
                    (err: string, data: any) => {
                        if (data) data = JSON.parse(data);
                        if (err) return toast.error(err);
                        if (data.name == 'snailycad') {
                            $('#wizard_directory').text(wizardStorage.cadDir);
                            $('.existing').slideToggle().delay(400);
                            $('.confirm').slideToggle();
                            return;
                        }
                        toast.error(
                            'The directory provided is not a SnailyCAD Installation'
                        );
                        return;
                    }
                );
                return;
            }
            toast.error('Could not find <code>package.json</code>');
        }
    );
});

// * Verify New Installation
$(document).on('click', '.install:visible .wizard_next', () => {
    if (wizardStorage.cadDir == '') {
        toast.warning('Please select a directory');
        return;
    }
    fs.readdir(wizardStorage.cadDir, (err: string, data: any) => {
        if (err) toast.error(err);
        if (data) {
            let d: Array<any> = data; // Just helps intellisense understand it's an array.
            if (d.find((elm) => elm == 'snaily-cadv4') == 'snaily-cadv4') {
                return toast.warning(
                    'SnailyCAD is already in the specified directory!'
                );
            }

            $('#wizard_directory').text(wizardStorage.cadDir);
            $('.install:visible').slideToggle().delay(400);
            $('.confirm').slideToggle();
        }
    });
});

// * Setup
$(document).on('click', '.confirm:visible .wizard_next', async () => {
    $('.confirm').slideToggle().delay(400);
    $('.setup').slideToggle();

    if (wizardStorage.installType == 'existing') {
        storage('cadDir').write(wizardStorage.cadDir);
        storage('wizardComplete').write('true');
        location.reload();
        return;
    }
    if (wizardStorage.installType == 'new') {
        api.post('/install', {}, (data, err) => {
            if (data) log(data, 'neutral');
            if (err) {
                log(err, 'error');
                toast.error(err);
            }
        });
    }
});
