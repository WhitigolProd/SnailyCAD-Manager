// Load Remote Settings
const remoteSettings: any = {
    port: storage('remotePort').read(),
    password: storage('remotePassword').read(),
    onStart: storage('remoteOnStart').read(),
};

const loadServerSettings = () => {
    if (remoteSettings.port) {
        $('#server_settings_port').val(remoteSettings.port);
    }
    if (remoteSettings.password) {
        $('#server_settings_password').val(remoteSettings.password);
    }
    if (remoteSettings.onStart == 'true') {
        $('#server_settings_onstart').prop('checked', true);
    }
    if (remoteSettings.onStart == 'false') {
        $('#server_settings_onstart').prop('checked', false);
    }
};

$(document).on('submit', '#remote_settings_form', (e) => {
    e.preventDefault();
    const port: any = $('#server_settings_port').val();
    const password: any = $('#server_settings_password').val();
    const onStart: any = $('#server_settings_onstart').is(':checked');
    storage('remotePort').write(port);
    storage('remotePassword').write(password);
    storage('remoteOnStart').write(onStart);
    remoteSettings.port = port;
    remoteSettings.password = password;
    remoteSettings.onStart = onStart;
    toast.success('Remote Settings Saved');
    modal('#remote_server').close();
});
