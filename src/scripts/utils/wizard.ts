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

// * Switcher
$(document).on('click', '.wizard_next', () => {
    if ($('.wizard_steps article:visible #install_type').is(':visible')) {
        if ($('#install_type').val() == 'null') {
            return toast.error('Invalid Selection');
        }
        wizardStorage.installType = `${$('#install_type').val()}`;
    }

    $('.wizard_steps article:visible')
        .slideToggle()
        .next()
        .delay(400)
        .slideToggle();
});
$(document).on('click', '.wizard_prev', () => {
    let beginning = $('.wizard_steps article')[0];
    $('.wizard_steps article:visible').slideToggle();
    $(beginning).delay(400).slideToggle();
});
