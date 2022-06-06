function HandleUpdateButton() {
    if (ver.current != ver.latest) {
        elements.main.buttons.update.css('display', 'block');
    }
}

$(elements.main.buttons.start).on('click', () => {
    command(
        `yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
    );
});

$(elements.main.buttons.update).on('click', () => {
    command(
        `curl https://raw.githubusercontent.com/SnailyCAD/autoupdater/main/dist/index.js > script.js && node script.js`
    );
});
