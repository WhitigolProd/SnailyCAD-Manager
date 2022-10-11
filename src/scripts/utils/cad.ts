const checkOutput = async (data: string) => {
    if (data.indexOf('SnailyCADv4 is running') >= 1) {
        $('#start_cad').hide();
    }
};

const startCad = async () => {
    const cadScript = await spawn(
        'yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start',
        {
            shell: true,
            cwd: storage('cadDir').read(),
        }
    );

    await cadScript.stdout.on('data', (data: any) => {
        data = data.toString();
        log(data, 'neutral');
        checkOutput(data);
    });
    await cadScript.stderr.on('data', (data: any) => {
        data = data.toString();
        log(data, 'warning');
    });
};
