$(document).on('submit', '#auth_form', (e) => {
    e.preventDefault();
    $('#login_status')
        .text('Checking...')
        .removeClass('hidden')
        .removeClass('text-green-500')
        .removeClass('text-red-500');
    $.post('/auth/check', {
        password: $('#password').val(),
    })
        .then((data) => {
            if (data.success) {
                $('#login_status')
                    .removeClass('text-red-500')
                    .addClass('text-green-500')
                    .text('Success! Redirecting...');
                $('#password').addClass('hidden');

                // Give the session time to authenticate, then redirect
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
                return;
            }
            $('#login_status')
                .removeClass('text-green-500')
                .addClass('text-red-500')
                .text(data.message);
        })
        .catch((err) => {
            $('#login_status')
                .removeClass('text-green-500')
                .addClass('text-red-500')
                .text('An Error Occurred! Please try again later.');
        });
});
console.log('Auth Page Loaded');
