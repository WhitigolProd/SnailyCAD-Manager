// * Wizard

// * Hide if Complete
let wizardComplete = false;
if (storage('wizardComplete').read() == 'true') {
    wizardComplete = true;
    $('.wizard').hide();
}
