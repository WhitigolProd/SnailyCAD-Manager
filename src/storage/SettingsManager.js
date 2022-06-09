let mSettings = {
    winStart: localStorage.getItem('s-winStart') || null,
    cadAuto: localStorage.getItem('s-cadAuto') || null,
};

$(`#saveSettings`).on(`click`, () => {
    alert(`
    Settings have been saved!\n
    Open on Windows Start: ${$('#set-winStart').is(':checked')}\n
    Auto Start CAD: ${$('#set-cadAuto').is(':checked')}
    `);
});

$(() => {});



$(`#openSettings`).on(`click`, () => {
    $(`.settings-container`).fadeIn();
})

$(`#closeSettings`).on(`click`, () => {
    $(`.settings-container`).fadeOut();
})