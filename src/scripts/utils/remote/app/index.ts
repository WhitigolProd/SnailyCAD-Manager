// @ts-nocheck

$(() => {
    $.get('/api/version/cad').then((data) => {
        $('#cad_version').text(data);
        console.log(`CAD Version: ${data}`);
    });
    $.get('/api/version/app').then((data) => {
        $('#app_version').text(data);
        console.log(`App Version: ${data}`);
    });
});

const logOut = () => {
    $.post('/auth/logout')
        .then(() => {
            window.location.pathname = '/auth';
        })
        .catch(() => {
            toast.error('Failed to log out due to API error.');
        });
};
