// Always Get Status
setInterval(() => {
    fetch('../appStorage.json')
        .catch((err) => {
            vars.console.error(err);
        })
        .then((response) => response.json())
        .then((data) => {
            console.clear();
            vars.console.log(`API Fetched`);
            vars.api.result = data;

            $(`#buttonFetch`).hide();

            if (data.cad.cad == 'true') {
                $('#cadStatus')
                    .text('')
                    .attr('aria-busy', 'false')
                    .attr('data-status', 'online');
                $(`#startButton`).hide();
                $(`#stopButton`).show();
            } else {
                $('#cadStatus')
                    .text('')
                    .attr('aria-busy', 'false')
                    .attr('data-status', 'offline');
                $(`#stopButton`).hide();
                $(`#startButton`).show();
            }
        });
}, 1500);

let password = [[[[[[[[[[[[[[[[$(`#loadPass`).val()]]]]]]]]]]]]]]]];

$(`#loadPass`).remove();

let passwordCorrect = false;
let checkpass = () => {
    if (
        $(`#access`).val() ===
        password[0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0]
    ) {
        $(`#access-dialog`).attr('open', false);
        passwordCorrect = true;
        vars.toast.success(`Welcome to SnailyCAD Remote Manager!`);
        return true;
    } else {
        vars.toast.error(`Incorrect Password - Please try again.`);
    }
};

let tamperErrorShown = false;
setInterval(() => {
    if (
        (passwordCorrect === false &&
            $(`#access-dialog`).is(':visible') === false) ||
        (!$(`#access-dialog`).attr('style') === false &&
            passwordCorrect === false &&
            tamperErrorShown === false)
    ) {
        $(`body`).html('');
        setTimeout(() => {
            tamperErrorShown = true;
            alert(
                `Site Tampering Detected!\n\nTampering with this site is STRICTLY PROHIBITED!`
            );
            location.reload();
        }, 150);
    }
}, 500);

let clientIP = null;
let client = null;
$.getJSON('https://api.ipify.org?format=json', function (data) {
    // Setting text of element P with id gfg
    $('#ip code').text(data.ip);
    clientIP = data.ip;
    client = data;

    fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: data.ip }),
    })
        .catch((err) => {
            vars.console.error(err);
        })
        .then((res) => {
            vars.console.log(
                `IP Log Return Status: ${res.status} (${res.statusText})`,
                'color: lightgreen;'
            );
        });
});

$(`#access-form`).on('submit', (e) => {
    e.preventDefault();
    checkpass();
});
