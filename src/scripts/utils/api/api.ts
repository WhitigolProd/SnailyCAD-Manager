const appAPI = express();
const bodyParser = require('body-parser');

const getStatus = (port: any) => {
    if (port) {
        findProcess('port', port).then((list: any) => {
            if (list.length >= 0) {
                return true;
            }
            return false;
        });
    } else {
        return false;
    }
};

appAPI.use(bodyParser.urlencoded({ extended: true }));

const startAPI = async () => {
    const clientStatus = await getStatus(env('PORT_CLIENT').read());
    const APIStatus = await getStatus(env('PORT_API').read());

    await appAPI.listen('30789', () => {
        log('Manager API Started — Running on port 30789', 'success');
    });
};

appAPI.get('/', async (req: any, res: any) => {
    const clientStatus = getStatus(env('PORT_CLIENT').read());
    res.json({
        message: 'API Online',
        clientStatus: clientStatus,
    });
});

appAPI.post('/start', async (req: any, res: any) => {
    cadLoading = true;
    setTimeout(() => {
        cadLoading = false;
    }, 10000);
    if (req.body.keys.shift) {
        cadProcess = spawn(
            `yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`,
            [],
            { shell: true, cwd: storage('cadDir').read() }
        );
    } else {
        cadProcess = spawn(
            `node scripts/copy-env.mjs --client --api && yarn workspace @snailycad/client build && yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`,
            [],
            { shell: true, cwd: storage('cadDir').read() }
        );
    }

    cadProcess.stdout.on('data', (data: any) => {
        data = data.toString();
        log(data, 'neutral');
    });

    cadProcess.stderr.on('data', (data: any) => {
        data = data.toString();
        log(data, 'warning');
    });

    await res.json({
        status: 'Success',
    });
});

appAPI.post('/stop', async (req: any, res: any) => {
    killPort(env('PORT_CLIENT').read(), undefined)
        .then((data: any) => log(data.stdout, 'success'))
        .catch((err: any) => log(err, 'error'));

    killPort(env('PORT_API').read(), undefined)
        .then((data: any) => log(data.stdout, 'success'))
        .catch((err: any) => log(err, 'error'));
});

startAPI();
