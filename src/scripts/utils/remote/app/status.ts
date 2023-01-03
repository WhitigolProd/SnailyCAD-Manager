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
        $.get('/api/status/cad')
            .then((data) => {
                $('#api_unreachable').removeAttr('open');
                if (data.cadLoading) {
                    $('#starting_cad').removeClass('hidden');
                    $('#start_cad').addClass('hidden');
                    $('#stop_cad').addClass('hidden');
                }
                if (data.client_status && data.api_status) {
                    $('#starting_cad').addClass('hidden');
                    $('#start_cad').addClass('hidden');
                    $('#stop_cad').removeClass('hidden');
                }
                if (
                    !data.client_status &&
                    !data.api_status &&
                    !data.cadLoading
                ) {
                    $('#starting_cad').addClass('hidden');
                    $('#start_cad').removeClass('hidden');
                    $('#stop_cad').addClass('hidden');
                }
            })
            .catch(() => {
                $('#api_unreachable').attr('open', '');
            })
            .fail(() => {
                $('#api_unreachable').attr('open', '');
            });

        setTimeout(remStatus.cad, 1000);
    },
};
remStatus.client();
remStatus.api();
remStatus.cad();
