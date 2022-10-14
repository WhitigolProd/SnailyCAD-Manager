let requirements = {
    git: false,
    node: false,
    yarn: false,
    psql: false,
};

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
    await findProcess('name', 'postgres.exe').then((list: []) => {
        if (list.length >= 1) {
            $('.rqPsql')
                .text('PASSED')
                .attr('aria-busy', 'false')
                .css('color', 'lime');
            log('Requirement PostgreSQL Passed', 'success');
            return (requirements.psql = true);
        }
        $('.rqPsql')
            .html('FAILED<br>(Make sure the service is running on your system)')
            .attr('aria-busy', 'false')
            .css('color', 'orange');
        log('Requirement PSQL Failed', 'warning');
    });

    log('Requirement Tests Complete — Checking Status', 'info');
    checkAppVersion();

    if (
        requirements.git &&
        requirements.node &&
        requirements.psql &&
        requirements.yarn
    ) {
        $('.requirements').hide();
        await cadCheck();
    }
};
