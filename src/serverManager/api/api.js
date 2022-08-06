let remoteData = {
    started: false,
    stopped: false,
    executed: {
        cad: {
            start: false,
            stop: false,
        },
    },
    reset: () => {
        fs.writeFile(
            path.join(__dirname, './serverManager/api/api.json'),
            JSON.stringify(remoteData.executed, null, 2),
            (err) => {
                if (err) console.error(err);
            }
        );
        remoteData.started = false;
        remoteData.stopped = false;
    },
};

let remote = {
    start: () => {
        if (remoteData.started == true) {
            spw(
                `node scripts/copy-env.mjs --client --api && yarn workspace @snailycad/client build && yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`
            );
        }
    },
    stop: () => {
        spw(
            `npx kill-port ${cad.env.PORT_CLIENT} && npx kill-port ${cad.env.PORT_API}`
        );
    },
};

// Get API Data
setInterval(() => {
    let serverApi = fetch(path.join(__dirname, './serverManager/api/api.json'))
        .catch((err) => {
            alert(`Server API Error \n${err}`);
        })
        .then((response) => response.json())
        .then((api) => {
            if (api.cad.start == true) {
                remoteData.started = true;
                remote.start();
                remoteData.reset();
            }
            if (api.cad.stop == true) {
                remoteData.stopped = true;
                remote.stop();
                remoteData.reset();
            }
            if (!api.cad.start) {
                remoteData.reset();
            }
            if (!api.cad.stop) {
                remoteData.reset();
            }
        });
}, 1500);
