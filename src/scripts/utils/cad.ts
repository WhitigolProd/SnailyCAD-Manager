let cadLoading: boolean = false;
let client_status: boolean = false;
let api_status: boolean = false;
const getCadStatus = async () => {
    const updateButtons = async () => {
        if (cadLoading) {
            $('#starting_cad').show();
            $('#start_cad').hide();
            $('#stop_cad').hide();
        }
        if (client_status && api_status) {
            $('#starting_cad').hide();
            $('#start_cad').hide();
            $('#stop_cad').show();
            cadLoading = false;
        }
        if (!client_status && !api_status && !cadLoading) {
            $('#starting_cad').hide();
            $('#start_cad').show();
            $('#stop_cad').hide();
        }
        setTimeout(getCadStatus, 1000);
    };

    if (env('PORT_CLIENT').read() && env('PORT_CLIENT').read()) {
        const getClientStatus = async () => {
            await findProcess('port', env('PORT_CLIENT').read()).then(
                async (list: any) => {
                    $('#status_loading').hide();
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
