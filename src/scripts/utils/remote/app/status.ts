// @ts-ignore
let cadLoading: boolean;

const remStatus = {
    client: () => {
        $.get('/api/status/client').then((data) => {
            if (data.online) {
                $('#status_client')
                    .removeClass('text-red-500')
                    .addClass('text-green-500');
            } else {
                $('#status_client')
                    .removeClass('text-green-500')
                    .addClass('text-red-500');
            }

            setTimeout(remStatus.client, 1000);
        });
    },
    api: () => {
        $.get('/api/status/api').then((data) => {
            if (data.online) {
                $('#status_api')
                    .removeClass('text-red-500')
                    .addClass('text-green-500');
            } else {
                $('#status_api')
                    .removeClass('text-green-500')
                    .addClass('text-red-500');
            }

            setTimeout(remStatus.api, 1000);
        });
    },
    cad: () => {
        $.get('/api/status/cad').then((data) => {
            if (data.cadLoading) {
                $('#starting_cad').show();
                $('#start_cad').hide();
                $('#stop_cad').hide();
            }
            if (data.client_status && data.api_status) {
                $('#starting_cad').hide();
                $('#start_cad').hide();
                $('#stop_cad').show();
            }
            if (!data.client_status && !data.api_status && !data.cadLoading) {
                $('#starting_cad').hide();
                $('#start_cad').show();
                $('#stop_cad').hide();
            }
        });

        setTimeout(remStatus.cad, 1000);
    },
};
remStatus.client();
remStatus.api();
remStatus.cad();
