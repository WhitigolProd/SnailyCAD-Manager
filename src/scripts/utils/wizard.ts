// * Wizard

// * Hide if Complete
let wizardComplete = false;
if (storage.read("wizardComplete") == "true") {
  wizardComplete = true;
  $(".wizard").hide();
}
