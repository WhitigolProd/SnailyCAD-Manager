const updateApp = async () => {
    if (api_status || client_status || cadLoading) {
        return toast.warning('Please stop the CAD before updating the app!');
    }
    const download = require('download');
    toast.info('Starting Update Download');
    $('#app_update_btn')
        .text('Downloading...')
        .attr('onclick', 'toast.warning("Update In Progress");')
        .attr('aria-busy', 'true');
    $('#app_dismiss_btn').addClass('hidden');
    await download(updateDownloadUrl, fromRoot('../../update'), {
        filename: 'update.exe',
    }).then(() => {
        toast.success('Starting Update Process');
        spawn(fromRoot('../../update/update.exe'), [], {
            detached: true,
            stdio: 'ignore',
        });
        app.close();
    });
};
