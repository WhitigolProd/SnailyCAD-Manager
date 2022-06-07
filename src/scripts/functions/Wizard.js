const rqm = require('command-exists');

function requirements() {
    rqm('node').then(function (command) {
        console.log('exists');
    }).catch(function () {
        console.log('doesn\'t exist');
    });
}

if (!config.firstRun || true) {
    console.log(
        '%cFirst Run - Showing Setup Wizard',
        'background-color: darkorange; padding: 0.5em 1em; font-weight: bold;'
    );
} else {
    $(elements.wizard).hide();
}