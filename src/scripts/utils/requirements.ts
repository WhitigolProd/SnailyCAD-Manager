let requirements = {
    git: false,
    node: false,
    pnpm: false,
    psql: false,
    complete: false,
};

const checkComplete = setInterval(async () => {
    if (requirements.git && requirements.node && requirements.pnpm) {
        clearInterval(checkComplete);

        requirements.complete = true;

        log('Requirement Tests Complete — Checking Versions', 'info');
        $('.requirements').addClass('hidden');
        await checkAppVersion();
        await loadWizard();
        await cadCheck();

        // * Everything else that should be ran if requirements are passed
        executeStartFunction();
        if (storage('remoteOnStart').read() && storage('cadDir').read()) {
            let remoteOnStart = storage('remoteOnStart').read();
            if (remoteOnStart == 'true') startRemoteServer();
            if (remoteOnStart == 'false') return;
        } else {
            log('Remote server is not configured!', 'warning');
        }

        createEnvInputs();
        loadEnvValues();
    }
}, 300);

const checkRequirements = async () => {
    await commandExists('git', (err: string, exists: boolean) => {
        if (err) throw new Error(err);
        if (exists) {
            $('.rqGit')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement GIT Passed', 'success');
            return (requirements.git = true);
        }
        $('.rqGit')
            .text('FAILED')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement GIT Failed', 'warning');
    });
    await commandExists('node', (err: string, exists: boolean) => {
        if (err) throw new Error(err);
        if (exists) {
            $('.rqNode')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement NodeJS Passed', 'success');
            return (requirements.node = true);
        }
        $('.rqNode')
            .text('FAILED')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement NODE Failed', 'warning');
    });
    await commandExists('pnpm', (err: string, exists: boolean) => {
        if (err) throw new Error(err);
        if (exists) {
            $('.rqPnpm')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement pnpm Passed', 'success');
            return (requirements.pnpm = true);
        }
        $('.rqPnpm')
            .text('FAILED')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement pnpm Failed', 'warning');
    });
};
