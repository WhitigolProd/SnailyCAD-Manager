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

    const sendStartWebhook = setInterval(() => {
        if (!cadLoading) {
            webhooks.online();
            clearInterval(sendStartWebhook);
        }
    }, 1000);

    if (keys.shift) {
        cadProcess = spawn('pnpm run start', [], {
            shell: true,
            cwd: storage('cadDir').read(),
        });
    } else {
        cadProcess = spawn(
            `node scripts/copy-env.mjs --client --api && pnpm turbo run build --filter=@snailycad/client && cd apps/api && pnpm run build && cd ../../ && pnpm run start`,
            [],
            { shell: true, cwd: storage('cadDir').read() }
        );
    }

    cadProcess.on('exit', (code: number) => {
        const offlineWebhook = setInterval(() => {
            webhooks.offline();
            clearInterval(offlineWebhook);
        });

        log(`CAD Process exited with code ${code}`, 'warning');
        toast.info(
            'The CAD Process has exited. If this was in error, check logs!'
        );
        cadLoading = false;
    });

    cadProcess.stdout.on('data', (data: any) => {
        data = data.toString();
        log(data, 'neutral');
        if (data.indexOf('exited with code 1') > 0) {
            api.post('/stop', {}, (data, err) => {
                if (data) log(data, 'neutral');
                if (err) {
                    log(err, 'error');
                    toast.error(err);
                }
            });
        }
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

appAPI.post('/install', (req: any, res: any) => {
    res.json({
        message: 'Starting Installation',
    });
    const installScript = spawn(
        'echo Downloading Repository && git clone https://github.com/SnailyCAD/snaily-cadv4.git && echo Opening Directory && cd snaily-cadv4 && echo Installing Dependencies (This may take a while) && pnpm install --config.confirmModulesPurge=false --prod=false && echo Copying ENV && copy .env.example .env && echo Moving ENV && node scripts/copy-env.mjs --client --api && echo Building CAD (This might take a while) && pnpm run build && echo Installation Complete',
        [],
        {
            shell: true,
            cwd: wizardStorage.cadDir,
        }
    );

    installScript.stdout.on('data', (data: Buffer) => {
        let d = data.toString();

        // * Install Steps (To Display on Wizard)
        if (d.includes('Downloading Repository')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Opening Directory')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Installing Dependencies (This may take a while)')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Copying ENV')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Moving ENV')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Building CAD (This might take a while)')) {
            $('#setup_stages').text(d);
        }
        if (d.includes('Installation Complete')) {
            $('#setup_stages').text(d);
            storage('cadDir').write(
                path.join(wizardStorage.cadDir, '/snaily-cadv4')
            );
            storage('wizardComplete').write('true');
            storage('start-func').write(`
                modal('#env_editor').open();
                $('#env_editor article header').append('<span style="color: orange;">Initial Configuration Required</span>');
                $('#env_editor article footer .error').addClass('hidden');
            `);
            app.hard_restart();
        }
        log(d, 'neutral');
    });

    installScript.stderr.on('data', (data: Buffer) => {
        let d = data.toString();
        log(d, 'warning');
    });
});

appAPI.post('/update', (req: any, res: any) => {
    if (client_status || api_status) {
        toast.error('Please stop the CAD before updating!');
        return res.json({
            message: 'Please stop the CAD before updating!',
        });
    }

    toast.info('Starting Update...');

    // Hide the start button
    $('#start_cad').addClass('hidden');
    // Hide the update button
    $('#update_cad').addClass('hidden');
    // Show the update loading button
    $('#update_loading').removeClass('hidden');
    res.json({
        message: 'Starting Update',
    });
    const updateScript = spawn(
        'echo Stashing Changes && git stash && echo Running Update Script && git pull origin main && pnpm install --config.confirmModulesPurge=false --prod=false && pnpm run build && echo Update Complete',
        [],
        {
            shell: true,
            cwd: storage('cadDir').read(),
        }
    );

    updateScript.stdout.on('data', (data: Buffer) => {
        let d = data.toString();
        log(d, 'neutral');

        // When the update has started, hide the update button, and show the update loading button
        if (d.includes('Running Update Script')) {
            $('#update_cad').addClass('hidden');
            $('#update_loading').removeClass('hidden');
        }

        // When the update has finished, hide both buttons
        if (d.includes('Update Complete')) {
            $('#update_cad').addClass('hidden');
            $('#update_loading').addClass('hidden');
            // Soft Restart App
            app.restart();
        }
    });

    updateScript.stderr.on('data', (data: Buffer) => {
        let d = data.toString();
        log(d, 'warning');
    });

    updateScript.on('exit', (code: number) => {
        log(`Update Process exited with code ${code}`, 'warning');
        toast.info(
            'The Update Process has exited. If this was in error, check logs!'
        );
        // Hide the update loading button
        $('#update_loading').addClass('hidden');
        // Show the update button
        $('#update_cad').removeClass('hidden');
    });
});

appAPI.post('/reset', (req: any, res: any) => {
    const resetScript = spawn(
        'echo Resetting Node Modules && rmdir /s /q "node_modules" && del /s /q yarn.lock && del /s /q pnpm-lock.yaml && echo Installing Dependencies (This may take a while) && pnpm install --config.confirmModulesPurge=false --prod=false && echo Node Modules Reset',
        [],
        {
            shell: true,
            cwd: storage('cadDir').read(),
        }
    );
    $('#reset_node_modules').attr('aria-busy', 'true');

    resetScript.stdout.on('data', (data: Buffer) => {
        let d = data.toString();
        log(d, 'neutral');
    });

    resetScript.stderr.on('data', (data: Buffer) => {
        let d = data.toString();
        log(d, 'warning');
    });

    resetScript.on('exit', (code: number) => {
        log(`Reset Process exited with code ${code}`, 'warning');
        toast.info(
            'The Reset Process has exited. If this was in error, check logs!'
        );
        $('#reset_node_modules').attr('aria-busy', 'false');
    });
});

startAPI();

$('dialog').scrollTop();
