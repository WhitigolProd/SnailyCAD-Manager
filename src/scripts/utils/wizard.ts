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
        $('.type').slideToggle();
        $('.install').delay(400).slideToggle();
    }
    if (type == 'existing') {
        $('.type').slideToggle();
        $('.existing').delay(400).slideToggle();
    }
    console.log(type);
});

// * Type: New Installation

// * Reset Wizard
$(document).on('click', '.wizard_prev', () => {
    let beginning = $('.wizard_steps article')[0];
    $('.wizard_steps article:visible').slideToggle();
    $(beginning).delay(400).slideToggle();
});

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
