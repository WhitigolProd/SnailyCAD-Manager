//! USE THIS FUNCTION ONLY FOR EXECUTING CUSTOM COMMANDS FROM THE CONSOLE
function cmd(cmd) {
    exec(
        cmd,
        { cwd: `C:\\Users\\${uuid}\\Documents` },
        (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stderr);
            }
        }
    );
}
//? Use this function for executing pre-defined commands inside the manager-app code.
function command(cmd) {
    addToOutputStream('Executing Command - Please Wait...', 'f');
    exec(cmd, { cwd: `${config.cadDir}` }, (error, stdout, stderr) => {
        if (error) {
            addToOutputStream(error, 'c');
            addToOutputStream('Command Complete', 'f');
        }
        if (stdout) {
            addToOutputStream(stdout, 'a');
            addToOutputStream('Command Complete', 'f');
        }
        if (stderr) {
            addToOutputStream(stderr, 'b');
            addToOutputStream('Command Complete', 'f');
        }
    });
}
function addToOutputStream(output, type) {
    if (type == 'a') {
        elements.main.cmdoutput.prepend(`<span>${output}</span>`);
    } else if (type == 'b') {
        elements.main.cmdoutput.prepend(
            `<span style="color: orange">${output}</span>`
        );
    } else if (type == 'c') {
        elements.main.cmdoutput.prepend(
            `<span style="color: red;">${output}</span>`
        );
    } else if (type == 'f') {
        elements.main.cmdoutput.prepend(
            `<span style="color: cyan;">----- ${output} -----</span>`
        );
    } else {
        elements.main.cmdoutput.prepend(
            `<span style="color: red; font-weight: bold;">CRITICAL UNCAUGHT ERROR</span>`
        );
    }
}
function spw(cmd, args) {
    let command = spawn(cmd, args, { cwd: `${config.cadDir}` });

    command.stdout.on('data', (stdout) => {
        addToOutputStream(stdout.toString(), 'a');
        console.log(stdout.toString());
    });

    command.stderr.on('data', (stderr) => {
        addToOutputStream(stderr.toString(), 'b');
        console.log(stderr.toString());
    });
}
