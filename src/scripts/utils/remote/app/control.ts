const remControl = {
    start: () => {
        $.post('/api/control/start', {}).then((data) => {
            if (data.success) {
                $('#start_cad').addClass('hidden');
                $('#stop_cad').removeClass('hidden');
                $('#starting_cad').removeClass('hidden');
                toast.info(data.message);
            } else {
                toast.error(data.message);
            }
        });
    },
    stop: () => {
        $.post('/api/control/stop', {}).then((data) => {
            if (data.success) {
                $('#start_cad').removeClass('hidden');
                $('#stop_cad').addClass('hidden');
                $('#starting_cad').addClass('hidden');
                toast.info(data.message);
            } else {
                toast.error(data.message);
            }
        });
    },
};
