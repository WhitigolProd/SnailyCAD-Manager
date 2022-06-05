//! USE THIS FUNCTION ONLY FOR EXECUTING CUSTOM COMMANDS FROM THE CONSOLE
function cmd(cmd) {
    exec(cmd, {'cwd':`C:\\Users\\${uuid}\\Documents`}, (error, stdout, stderr)=> {
        if (error) {
            console.log(error);
        }
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.log(stderr);
        }
    })
}

//? Use this function for executing pre-defined commands inside the manager-app code.
function command(cmd) {
    exec(cmd, {'cwd':`${process.env.CAD_DIR}`}, (error, stdout, stderr)=> {
        if (error) {
            addToOutputStream(error, 'c')
        }
        if (stdout) {
            addToOutputStream(stdout, 'a')
        }
        if (stderr) {
            addToOutputStream(stderr, 'b')
        }
    })
}

function addToOutputStream(output, type) {
    if (type == 'a') {
        elements.main.cmdoutput.prepend(`<span>${output}</span>`)
    }else if (type == 'b') {
        elements.main.cmdoutput.prepend(`<span style="color: orange">${output}</span>`)
    }else if (type == 'c') {
        elements.main.cmdoutput.prepend(`<span style="color: red;">${output}</span>`)
    }else {
        elements.main.cmdoutput.prepend(`<span style="color: red; font-weight: bold;">CRITICAL UNCAUGHT ERROR</span>`)
    }
}