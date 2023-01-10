let requirements = {
    git: false,
    node: false,
    yarn: false,
    psql: false,
    complete: false,
};

const checkComplete = setInterval(async () => {
    if (
        requirements.git &&
        requirements.node &&
        requirements.yarn &&
        requirements.psql
    ) {
        requirements.complete = true;

        log('Requirement Tests Complete — Checking Versions', 'info');
        await checkAppVersion();

        $('.requirements').addClass('hidden');
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
        clearInterval(checkComplete);
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
    await commandExists('yarn', (err: string, exists: boolean) => {
        if (err) throw new Error(err);
        if (exists) {
            $('.rqYarn')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement Yarn Passed', 'success');
            return (requirements.yarn = true);
        }
        $('.rqYarn')
            .text('FAILED')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement YARN Failed', 'warning');
    });
    await isPostgres((db: any) => {
        if (db.running) {
            $('.rqPsql')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement PSQL Passed', 'success');
            return (requirements.psql = true);
        }
        $('.rqPsql')
            .text('FAILED (Verify that Postgres is running)')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement PSQL Failed', 'warning');
    });
};
