function HandleUpdateButton() {
    if (ver.current != ver.latest) {
        elements.main.buttons.update.show();
    }
}

//? Display CAD Status Change
if (st.cad == 'false') {
    $(elements.main.status).attr('data-status', 'offline');
    $(elements.main.buttons.stop).css('display', 'none');
    $(elements.main.buttons.start).css('display', 'flex');
} else if (st.cad == 'true') {
    $(elements.main.status).attr('data-status', 'online');
    $(elements.main.buttons.stop).css('display', 'flex');
    $(elements.main.buttons.start).css('display', 'none');
}
setInterval(() => {
    if (st.cad == 'false') {
        $(elements.main.status).attr('data-status', 'offline');
        $(elements.main.buttons.stop).css('display', 'none');
        $(elements.main.buttons.start).css('display', 'flex');
    } else if (st.cad == 'true') {
        $(elements.main.status).attr('data-status', 'online');
        $(elements.main.buttons.stop).css('display', 'flex');
        $(elements.main.buttons.start).css('display', 'none');
    }
}, 1000);

$(elements.main.buttons.start).on('click', () => {
    spw(
        `yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
    );
});

$(elements.main.buttons.stop).on('click', () => {
    spw(`npx kill-port ${config.cadPort} && npx kill-port ${config.cadAPI}`);
});

$(elements.main.buttons.update).on('click', () => {
    spw(
        `curl https://raw.githubusercontent.com/SnailyCAD/autoupdater/main/dist/index.js > script.js && node script.js`
    );
});

$(elements.main.buttons.dir).on('click', () => {
    cmd(`start ${config.cadDir}`);
});

$(`#mg-docs`).on('click', () => {
    cmd(`start ${app.links.manager.docs}`)
})

$(elements.main.buttons.github).on('click', () => {
    cmd(`start ${app.links.cad.github}`);
});

$(elements.main.buttons.docs).on('click', () => {
    cmd(`start ${app.links.cad.docs}`);
});

$('#clearCMD').on('click', () => {
    $('.cmd').html('');
    addToOutputStream('Command View Cleared', 'f');
});
