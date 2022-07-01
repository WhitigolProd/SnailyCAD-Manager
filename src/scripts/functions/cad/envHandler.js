$(`#editEnv`).on('click', () => {
    $(`#env1`).val(`${cad.env.POSTGRES_PASSWORD}`);
    $(`#env2`).val(`${cad.env.POSTGRES_USER}`);
    $(`#env3`).val(`${cad.env.DB_HOST}`);
    $(`#env4`).val(`${cad.env.DB_PORT}`);
    $(`#env5`).val(`${cad.env.POSTGRES_DB}`);
    $(`#env6`).val(`${str(20)}`);
    $(`#env7`).val(`${str(32)}`);
    $(`#env8`).val(`${cad.env.CORS_ORIGIN_URL}`);
    $(`#env9`).val(`${cad.env.NEXT_PUBLIC_PROD_ORIGIN}`);
    $(`#env10`).val(`${cad.env.DOMAIN}`);
    $(`#env13`).val(`${cad.env.PORT_CLIENT}`);
    $(`#env12`).val(`${cad.env.PORT_API}`);
    $(`#env12`).val(`${cad.env.PORT_API}`);

    if (cad.env.SECURE_COOKIES_FOR_IFRAME == 'true') {
        $(`#env11`).prop('checked', true);
    } else {
        $(`#env11`).prop('checked', false);
    }

    if (cad.env.TELEMETRY_ENABLED == 'true') {
        $(`#env14`).prop('checked', true);
    } else {
        $(`#env14`).prop('checked', false);
    }

    $(`env`).show();
});
$(`#openEnvFile`).on('click', () => {
    exec(
        `code ${config.cadDir}/.env || notepad ${config.cadDir}/.env`,
        (error, stdout, stderr) => {
            if (stderr) {
                console.log(stderr);
            } else if (stdout) {
                console.log(stdout);
            } else if (error) {
                console.log(error);
            }
        }
    );
});

//? Env Modifier
let writeEnv = () => {
    parsenv.write({ path: `${config.cadDir}/.env` });
};
let setEnv = {
    POSTGRES_PASSWORD: (data) => {
        cad.env.POSTGRES_PASSWORD = data;
        parsenv.edit({ POSTGRES_PASSWORD: `${data}` });
        writeEnv();
    },
    POSTGRES_USER: (data) => {
        cad.env.POSTGRES_USER = data;
        parsenv.edit({ POSTGRES_USER: `${data}` });
        writeEnv();
    },
    DB_HOST: (data) => {
        cad.env.DB_HOST = data;
        parsenv.edit({ DB_HOST: `${data}` });
        writeEnv();
    },
    DB_PORT: (data) => {
        cad.env.DB_PORT = data;
        parsenv.edit({ DB_PORT: `${data}` });
        writeEnv();
    },
    POSTGRES_DB: (data) => {
        cad.env.POSTGRES_DB = data;
        parsenv.edit({ POSTGRES_DB: `${data}` });
        writeEnv();
    },
    JWT_SECRET: (data) => {
        cad.env.JWT_SECRET = data;
        parsenv.edit({ JWT_SECRET: `${data}` });
        writeEnv();
    },
    ENCRYPTION_TOKEN: (data) => {
        cad.env.ENCRYPTION_TOKEN = data;
        parsenv.edit({ ENCRYPTION_TOKEN: `${data}` });
        writeEnv();
    },
    CORS_ORIGIN_URL: (data) => {
        cad.env.CORS_ORIGIN_URL = data;
        parsenv.edit({ CORS_ORIGIN_URL: `${data}` });
        writeEnv();
    },
    NEXT_PUBLIC_PROD_ORIGIN: (data) => {
        cad.env.NEXT_PUBLIC_PROD_ORIGIN = data;
        parsenv.edit({ NEXT_PUBLIC_PROD_ORIGIN: `${data}` });
        writeEnv();
    },
    DOMAIN: (data) => {
        cad.env.DOMAIN = data;
        parsenv.edit({ DOMAIN: `${data}` });
        writeEnv();
    },
    SECURE_COOKIES_FOR_IFRAME: (data) => {
        cad.env.SECURE_COOKIES_FOR_IFRAME = data;
        parsenv.edit({ SECURE_COOKIES_FOR_IFRAME: `${data}` });
        writeEnv();
    },
    PORT_API: (data) => {
        cad.env.PORT_API = data;
        parsenv.edit({ PORT_API: `${data}` });
        writeEnv();
    },
    PORT_CLIENT: (data) => {
        cad.env.PORT_CLIENT = data;
        parsenv.edit({ PORT_CLIENT: `${data}` });
        writeEnv();
    },
    NODE_ENV: (data) => {
        cad.env.NODE_ENV = data;
        parsenv.edit({ NODE_ENV: `${data}` });
        writeEnv();
    },
    DATABASE_URL: (data) => {
        cad.env.DATABASE_URL = data;
        parsenv.edit({ DATABASE_URL: `${data}` });
        writeEnv();
    },
    TELEMETRY_ENABLED: (data) => {
        cad.env.TELEMETRY_ENABLED = data;
        parsenv.edit({ TELEMETRY_ENABLED: `${data}` });
        writeEnv();
    },
};

$(`#saveEnv`).on('click', () => {
    // POSTGRES_PASSWORD
    setEnv.POSTGRES_PASSWORD(`${$(`#env1`).val()}`);
    // POSTGRES_USER
    setEnv.POSTGRES_USER(`${$(`#env2`).val()}`);
    // DB_HOST
    setEnv.DB_HOST(`${$(`#env3`).val()}`);
    // DB_PORT
    setEnv.DB_PORT(`${$(`#env4`).val()}`);
    // POSTGRES_DB
    setEnv.POSTGRES_DB(`${$(`#env5`).val()}`);
    // JWT_SECRET
    setEnv.JWT_SECRET(`${$(`#env6`).val()}`);
    // ENCRYPTION_TOKEN
    setEnv.ENCRYPTION_TOKEN(`${$(`#env7`).val()}`);
    // CORS_ORIGIN_URL
    setEnv.CORS_ORIGIN_URL(`${$(`#env8`).val()}`);
    // NEXT_PUBLIC_PROD_ORIGIN
    setEnv.NEXT_PUBLIC_PROD_ORIGIN(`${$(`#env9`).val()}`);
    // DOMAIN
    setEnv.DOMAIN(`${$(`#env10`).val()}`);
    // PORT_CLIENT
    setEnv.PORT_CLIENT(`${$(`#env13`).val()}`);
    setConfig.cadPort(`${$(`#env13`).val()}`);
    // PORT_API
    setEnv.PORT_API(`${$(`#env12`).val()}`);
    setConfig.cadAPI(`${$(`#env12`).val()}`);
    // SECURE_COOKIES_FOR_IFRAME
    setEnv.SECURE_COOKIES_FOR_IFRAME(`${$(`#env11`).prop('checked')}`);
    // TELEMETRY_ENABLED
    setEnv.TELEMETRY_ENABLED(`${$(`#env14`).prop('checked')}`);
    // TOAST
    toast.success(`Environment Variables Saved!`);

    // Set envPending to False
    localStorage.setItem('envPending', false);

    $(`env`).fadeOut();
});
