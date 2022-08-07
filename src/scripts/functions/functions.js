function HandleUpdateButton() {
    if (ver.current != ver.latest) {
        elements.main.buttons.update.show();
    }
}

//? Display CAD Status Change
if (st.cad == 'false') {
    control.app.setStatus(false);
    $(elements.main.status).attr('data-status', 'offline');
    $(elements.main.buttons.stop).css('display', 'none');
    $(elements.main.buttons.start).css('display', 'flex');
} else if (st.cad == 'true') {
    control.app.setStatus(true);
    $(elements.main.status).attr('data-status', 'online');
    $(elements.main.buttons.stop).css('display', 'flex');
    $(elements.main.buttons.start).css('display', 'none');
}
setInterval(() => {
    if (st.cad == 'false') {
        control.app.setStatus(false);
        $(elements.main.status).attr('data-status', 'offline');
        $(elements.main.buttons.stop).css('display', 'none');
        $(elements.main.buttons.start).css('display', 'flex');
    } else if (st.cad == 'true') {
        control.app.setStatus(true);
        $(elements.main.status).attr('data-status', 'online');
        $(elements.main.buttons.stop).css('display', 'flex');
        $(elements.main.buttons.start).css('display', 'none');
    }
}, 1000);

$(elements.main.buttons.start).on('click', () => {
    if (!startBusy) {
        if (shiftKeyPressed == true) {
            spw(
                `yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
            );
        } else {
            spw(
                `node scripts/copy-env.mjs --client --api && yarn workspace @snailycad/client build && yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
            );
        }
    } else {
        toast.error('System Busy');
    }
});

ipc.on('api-startCad', () => {
    // spw(
    //     `node scripts/copy-env.mjs --client --api && yarn workspace @snailycad/client build && yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
    // );

    console.log('API Is working!');
});

$(elements.main.buttons.stop).on('click', () => {
    spw(
        `npx kill-port ${cad.env.PORT_CLIENT} && npx kill-port ${cad.env.PORT_API}`
    );
});

$(elements.main.buttons.update).on('click', () => {
    spw(
        `git stash && curl https://raw.githubusercontent.com/SnailyCAD/autoupdater/main/dist/index.js > script.js && node script.js`
    );
    $(`#sc-update`).attr('aria-busy', true);
    $(`#sc-update span:not(.material-icons-outlined)`).text(
        'Updating SnailyCAD'
    );
});

$(elements.main.buttons.dir).on('click', () => {
    cmd(`start ${config.cadDir}`);
});

$(`#mg-docs`).on('click', () => {
    cmd(`start ${app.links.manager.docs}`);
});

$(elements.main.buttons.github).on('click', () => {
    cmd(`start ${app.links.cad.github}`);
});

$(elements.main.buttons.docs).on('click', () => {
    cmd(`start ${app.links.cad.docs}`);
});

$(elements.titlebar.buttons.close).on('click', () => {
    control.app.close(() => {
        ipc.send('close-app');
    });
});

$(elements.titlebar.buttons.minimize).on('click', () => {
    ipc.send('minimize-app');
});

$('#clearCMD').on('click', () => {
    $('.cmd').html('');
    addToOutputStream('Command View Cleared', 'f');
});

$(`.reportProblem`).on('click', () => {
    cmd(`start ${app.links.manager.report}`);
});

$(`#closeLog`).on('click', () => {
    $(`log`).fadeOut();
    $(`#closeLog`).fadeOut();
});

$(`#forceShutDown`).on('click', () => {
    toast.success(`Killing Ports ${cad.env.PORT_CLIENT} & ${cad.env.PORT_API}`);
    spw(
        `npx kill-port ${cad.env.PORT_CLIENT} && npx kill-port ${cad.env.PORT_API}`
    );
});

$(`#appUpdate`).on(`click`, () => {
    $(`#appNoUpdate`).hide();
    $(`#appUpdate`).hide();
    $(`update`).append(
        `<p aria-busy="true">Updating SnailyCAD Manager, please wait...</p>`
    );
    $(`update`).append(
        `<p>Please do <b>not</b> restart or close the app while the update is in progress.</p>`
    );
    $(`update`).append(
        `<p>Once the update is complete, the app will restart automatically.</p>`
    );
    updateApp(
        `git init & git remote add origin https://github.com/WhitigolProd/scm-updater & git clone https://github.com/WhitigolProd/scm-updater.git tmp && git reset --mixed && xcopy tmp\\ .\\ /e /y && rm -r -f tmp .git`,
        pre.coreDir
    );
});

$(`#appNoUpdate`).on(`click`, () => {
    $(`update`).fadeOut();
    app.versions.skipUpdate = true;
});

function str(length) {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

setInterval(() => {
    let exported = {
        config: config,
        wizard: wizard,
        cad: st,
    };

    //? Export to Express Server
    $(() => {
        fs.writeFile(
            './src/serverManager/appStorage.json',
            JSON.stringify(exported, null, 2),
            (err) => {
                if (err) console.error(err);
            }
        );
    });
}, 1000);

//? Display App Updates
$(() => {
    notes.check();
});
let notes = {
    check: () => {
        if (wizard.requirements.ready != null) {
            console.log(
                `%cRELEASE: %c${update.version} notes available`,
                'color: lime;',
                ''
            );
            log.add(`App Version: ${app.versions.current}`, 3);
            if (
                update.dismissed != true &&
                package.version == app.versions.current
            ) {
                $(`#updateNotes`).html(`${convert.makeHtml(update.md)}`);
                updateDialog.open();

                if (!update.script || update.script != '') {
                    log.add('No Update Scripts Found', 0);
                } else {
                    eval(update.script);
                }
            }
        } else {
            setTimeout(notes.check, 250);
        }
    },
};

let open = (lnk) => {
    cmd(`start ${lnk}`); // Opens in Default Browser
};

let updateDialog = {
    close: () => {
        $(`#updateDialog`).removeAttr('open').fadeOut();
        let updateNotes = {
            version: update.version,
            md: update.md,
            script: update.script,
            newPackage: update.newPackage,
            dismissed: true,
        };
        fs.writeFile(
            `${__dirname}/update.json`,
            JSON.stringify(updateNotes, null, 2),
            (err) => {
                if (err) console.error(err);
            }
        );
    },
    open: () => {
        $(`#updateNotes`).html(`${convert.makeHtml(update.md)}`);
        $(`#updateDialog`).attr('open', 'true').fadeIn();
    },
};
