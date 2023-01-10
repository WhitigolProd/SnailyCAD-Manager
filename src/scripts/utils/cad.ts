// @ts-ignore
let cadLoading: boolean = false;
let client_status: boolean = false;
let api_status: boolean = false;
const getCadStatus = async () => {
    const updateButtons = async () => {
        if (cadLoading) {
            $('#starting_cad').removeClass('hidden');
            $('#start_cad').addClass('hidden');
            $('#stop_cad').addClass('hidden');
            $('#launch_cad').addClass('hidden');
        }
        if (client_status && api_status) {
            $('#starting_cad').addClass('hidden');
            $('#start_cad').addClass('hidden');
            $('#stop_cad').removeClass('hidden');
            $('#launch_cad')
                .removeClass('hidden')
                .attr(
                    'onclick',
                    'launchURL(env(`NEXT_PUBLIC_CLIENT_URL`).read())'
                );
            ipc.send('online');
            cadLoading = false;
        }
        if (!client_status && !api_status && !cadLoading) {
            $('#starting_cad').addClass('hidden');
            $('#start_cad').removeClass('hidden');
            $('#stop_cad').addClass('hidden');
            $('#launch_cad').addClass('hidden');
            ipc.send('offline');
        }
        setTimeout(getCadStatus, 1000);
    };

    if (env('PORT_CLIENT').read() && env('PORT_CLIENT').read()) {
        const getClientStatus = async () => {
            await findProcess('port', env('PORT_CLIENT').read()).then(
                async (list: any) => {
                    $('#status_loading').addClass('hidden');
                    if (list.length > 0) {
                        client_status = true;
                        $('#status_client').text('CLIENT').css('color', 'lime');
                    } else {
                        $('#status_client')
                            .text('CLIENT')
                            .css('color', '#ff5757');
                        client_status = false;
                    }
                    await getApiStatus();
                }
            );
        };

        const getApiStatus = async () => {
            await findProcess('port', env('PORT_API').read()).then(
                async (list: any) => {
                    if (list.length > 0) {
                        api_status = true;
                        if (client_status) cadLoading = false;
                        $('#status_api').text('API').css('color', 'lime');
                    } else {
                        $('#status_api').text('API').css('color', '#ff5757');
                        api_status = false;
                    }
                    await updateButtons();
                }
            );
        };

        await getClientStatus();
    }
};
getCadStatus();

const startCad = async () => {
    if (keys.shift) {
        toast.info('Sending Start Signal — Skipping Build');
        api.post(
            '/start',
            {
                keys,
            },
            (data, err) => {
                if (err) log(err, 'error');
                if (data) log(data, 'neutral');
            }
        );
    } else {
        toast.info('Sending Start Signal');
        api.post(
            '/start',
            {
                keys,
            },
            (data, err) => {
                if (err) log(err, 'error');
                if (data) log(data, 'neutral');
            }
        );
    }
};

const stopCad = async () => {
    toast.info('Sending Stop Signal');
    api.post('/stop', {}, (data, err) => {
        if (data) log(data, 'neutral');
        if (err) log(err, 'error');
    });
};
