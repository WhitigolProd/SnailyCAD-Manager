$(`#editEnv`).on('click', () => {
    exec(`notepad ${config.cadDir}/.env`, (error, stdout, stderr) => {
        if (stderr) {
            console.log(stderr);
        } else if (stdout) {
            console.log(stdout);
        } else if (error) {
            console.log(error);
        }
    })
})