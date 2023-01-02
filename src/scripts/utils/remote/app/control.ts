const remControl = {
    start: () => {
        $.post('/api/control/start', {}).then((data) => {
            if (data.success) {
                $('#start_cad').hide();
                $('#stop_cad').show();
                $('#starting_cad').show();
                toast.info(data.message);
            } else {
                toast.error(data.message);
            }
        });
    },
    stop: () => {
        $.post('/api/control/stop', {}).then((data) => {
            if (data.success) {
                $('#start_cad').show();
                $('#stop_cad').hide();
                $('#starting_cad').hide();
                toast.info(data.message);
            } else {
                toast.error(data.message);
            }
        });
    },
};
