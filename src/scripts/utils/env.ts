const envClass = class {
    selector: string;

    constructor(
        selector:
            | 'POSTGRES_PASSWORD'
            | 'POSTGRES_USER'
            | 'DB_HOST'
            | 'DB_PORT'
            | 'POSTGRES_DB'
            | 'JWT_SECRET'
            | 'ENCRYPTION_TOKEN'
            | 'CORS_ORIGIN_URL'
            | 'NEXT_PUBLIC_CLIENT_URL'
            | 'NEXT_PUBLIC_PROD_ORIGIN'
            | 'DOMAIN'
            | 'SECURE_COOKIES_FOR_IFRAME'
            | 'PORT_API'
            | 'PORT_CLIENT'
            | 'TELEMETRY_ENABLED'
            | 'NODE_ENV'
            | 'DATABASE_URL'
            | 'DISCORD_BOT_TOKEN'
            | 'DISCORD_SERVER_ID'
            | 'DISCORD_CLIENT_ID'
            | 'DISCORD_CLIENT_SECRET'
            | 'STEAM_API_KEY'
            | 'NODE_ENV'
            | 'DATABSE_URL'
            | ''
    ) {
        this.selector = selector;
    }

    read() {
        if (storage('cadDir').read()) {
            let currentenv = require('dotenv').config({
                path: path.join(storage('cadDir').read(), '/.env'),
                encoding: 'utf8',
            });

            if (this.selector == 'POSTGRES_PASSWORD') {
                return currentenv.parsed.POSTGRES_PASSWORD;
            }
            if (this.selector == 'POSTGRES_USER') {
                return currentenv.parsed.POSTGRES_USER;
            }
            if (this.selector == 'DB_HOST') {
                return currentenv.parsed.DB_HOST;
            }
            if (this.selector == 'DB_PORT') {
                return currentenv.parsed.DB_PORT;
            }
            if (this.selector == 'POSTGRES_DB') {
                return currentenv.parsed.POSTGRES_DB;
            }
            if (this.selector == 'JWT_SECRET') {
                return currentenv.parsed.JWT_SECRET;
            }
            if (this.selector == 'ENCRYPTION_TOKEN') {
                return currentenv.parsed.ENCRYPTION_TOKEN;
            }
            if (this.selector == 'CORS_ORIGIN_URL') {
                return currentenv.parsed.CORS_ORIGIN_URL;
            }
            if (this.selector == 'NEXT_PUBLIC_CLIENT_URL') {
                return currentenv.parsed.NEXT_PUBLIC_CLIENT_URL;
            }
            if (this.selector == 'NEXT_PUBLIC_PROD_ORIGIN') {
                return currentenv.parsed.NEXT_PUBLIC_PROD_ORIGIN;
            }
            if (this.selector == 'DOMAIN') {
                return currentenv.parsed.DOMAIN;
            }
            if (this.selector == 'SECURE_COOKIES_FOR_IFRAME') {
                return currentenv.parsed.SECURE_COOKIES_FOR_IFRAME;
            }
            if (this.selector == 'PORT_API') {
                return currentenv.parsed.PORT_API;
            }
            if (this.selector == 'PORT_CLIENT') {
                return currentenv.parsed.PORT_CLIENT;
            }
            if (this.selector == 'TELEMETRY_ENABLED') {
                return currentenv.parsed.TELEMETRY_ENABLED;
            }
            if (this.selector == 'NODE_ENV') {
                return currentenv.parsed.NODE_ENV;
            }
            if (this.selector == 'DATABASE_URL') {
                return currentenv.parsed.DATABASE_URL;
            }
            if (this.selector == 'DISCORD_BOT_TOKEN') {
                return currentenv.parsed.DISCORD_BOT_TOKEN;
            }
            if (this.selector == 'DISCORD_SERVER_ID') {
                return currentenv.parsed.DISCORD_SERVER_ID;
            }
            if (this.selector == 'DISCORD_CLIENT_ID') {
                return currentenv.parsed.DISCORD_CLIENT_ID;
            }
            if (this.selector == 'DISCORD_CLIENT_SECRET') {
                return currentenv.parsed.DISCORD_CLIENT_SECRET;
            }
            if (this.selector == 'STEAM_API_KEY') {
                return currentenv.parsed.STEAM_API_KEY;
            }
        }
        log('ENV Warning: NO_CAD_DIRECTORY', 'warning');
        return null;
    }

    save() {
        let parsenv = require('parsenv');

        parsenv.edit({
            POSTGRES_PASSWORD: `${$('#env_POSTGRES_PASSWORD').val()}`,
            POSTGRES_USER: `${$('#env_POSTGRES_USER').val()}`,
            DB_HOST: `${$('#env_DB_HOST').val()}`,
            DB_PORT: `${$('#env_DB_PORT').val()}`,
            POSTGRES_DB: `${$('#env_POSTGRES_DB').val()}`,
            JWT_SECRET: `${$('#env_JWT_SECRET').val()}`,
            ENCRYPTION_TOKEN: `${$('#env_ENCRYPTION_TOKEN').val()}`,
            CORS_ORIGIN_URL: `${$('#env_CORS_ORIGIN_URL').val()}`,
            NEXT_PUBLIC_CLIENT_URL: `${$('#env_NEXT_PUBLIC_CLIENT_URL').val()}`,
            NEXT_PUBLIC_PROD_ORIGIN: `${$(
                '#env_NEXT_PUBLIC_PROD_ORIGIN'
            ).val()}`,
            DOMAIN: `${$('#env_DOMAIN').val()}`,
            PORT_CLIENT: `${$('#env_PORT_CLIENT').val()}`,
            PORT_API: `${$('#env_PORT_API').val()}`,
            DISCORD_BOT_TOKEN: `${$('#env_DISCORD_BOT_TOKEN').val()}`,
            DISCORD_SERVER_ID: `${$('#env_DISCORD_SERVER_ID').val()}`,
            DISCORD_CLIENT_ID: `${$('#env_DISCORD_CLIENT_ID').val()}`,
            DISCORD_CLIENT_SECRET: `${$('#env_DISCORD_CLIENT_SECRET').val()}`,
            STEAM_API_KEY: `${$('#env_STEAM_API_KEY').val()}`,
            SECURE_COOKIES_FOR_IFRAME: `${$(
                '#env_SECURE_COOKIES_FOR_IFRAME'
            ).prop('checked')}`,
            TELEMETRY_ENABLED: `${$('#env_POSTGRES_PASSWORD').prop('checked')}`,
            NODE_ENV: `${env('NODE_ENV').read()}`,
            DATABASE_URL: `${env('DATABASE_URL').read()}`,
        });
        parsenv.write({ path: path.join(storage('cadDir').read(), '/.env') });
        $('#env_editor article header [style="color: orange;"]').remove();
        $('#env_editor article footer .error').removeClass('hidden');
        modal('#env_editor').close();
        toast.success('ENV Saved!');
        log('ENV Saved', 'success');
    }
};

const env = (
    selector:
        | 'POSTGRES_PASSWORD'
        | 'POSTGRES_USER'
        | 'DB_HOST'
        | 'DB_PORT'
        | 'POSTGRES_DB'
        | 'JWT_SECRET'
        | 'ENCRYPTION_TOKEN'
        | 'CORS_ORIGIN_URL'
        | 'NEXT_PUBLIC_CLIENT_URL'
        | 'NEXT_PUBLIC_PROD_ORIGIN'
        | 'DOMAIN'
        | 'SECURE_COOKIES_FOR_IFRAME'
        | 'PORT_API'
        | 'PORT_CLIENT'
        | 'TELEMETRY_ENABLED'
        | 'NODE_ENV'
        | 'DATABASE_URL'
        | 'DISCORD_BOT_TOKEN'
        | 'DISCORD_SERVER_ID'
        | 'DISCORD_CLIENT_ID'
        | 'DISCORD_CLIENT_SECRET'
        | 'STEAM_API_KEY'
        | 'NODE_ENV'
        | 'DATABASE_URL'
        | ''
) => {
    return new envClass(selector);
};

const createEnvInputs = () => {
    let fields = [
        'POSTGRES_PASSWORD',
        'POSTGRES_USER',
        'DB_HOST',
        'DB_PORT',
        'POSTGRES_DB',
        'JWT_SECRET',
        'ENCRYPTION_TOKEN',
        'CORS_ORIGIN_URL',
        'NEXT_PUBLIC_CLIENT_URL',
        'NEXT_PUBLIC_PROD_ORIGIN',
        'DOMAIN',
        'PORT_CLIENT',
        'PORT_API',
        'DISCORD_BOT_TOKEN',
        'DISCORD_SERVER_ID',
        'DISCORD_CLIENT_ID',
        'DISCORD_CLIENT_SECRET',
        'STEAM_API_KEY',
        'SECURE_COOKIES_FOR_IFRAME',
        'TELEMETRY_ENABLED',
    ];

    if (!storage('cadDir').read()) return;
    $('#env_content').html(''); // Reset

    fields.forEach((field) => {
        if (field === 'SECURE_COOKIES_FOR_IFRAME') {
            $('#env_content').append(`
            <label for="env_SECURE_COOKIES_FOR_IFRAME">
                <input type="checkbox" id="env_SECURE_COOKIES_FOR_IFRAME" name="SEUCRE_COOKIES_FOR_IFRAME" role="switch">
                Secure Cookies for iframe
            </label>
            `);
            return;
        }

        if (field === 'TELEMETRY_ENABLED') {
            $('#env_content').append(`
            <label for="env_TELEMETRY_ENABLED">
                <input type="checkbox" id="env_TELEMETRY_ENABLED" name="TELEMETRY_ENABLED" role="switch">
                Telemetry Enabled
            </label>
            `);
            return;
        }

        $('#env_content').append(`
        <label for="env_${field}">
        ${field.replaceAll('_', ' ')}
            <input
                type="text"
                id="env_${field}"
                placeholder="${field.replaceAll('_', ' ')}"
                name="${field}"
            />
        </label>
        `);
    });
};

const loadEnvValues = () => {
    if (!storage('cadDir').read()) return;
    let fields = [
        'POSTGRES_PASSWORD',
        'POSTGRES_USER',
        'DB_HOST',
        'DB_PORT',
        'POSTGRES_DB',
        'JWT_SECRET',
        'ENCRYPTION_TOKEN',
        'CORS_ORIGIN_URL',
        'NEXT_PUBLIC_CLIENT_URL',
        'NEXT_PUBLIC_PROD_ORIGIN',
        'DOMAIN',
        'PORT_CLIENT',
        'PORT_API',
        'DISCORD_BOT_TOKEN',
        'DISCORD_SERVER_ID',
        'DISCORD_CLIENT_ID',
        'DISCORD_CLIENT_SECRET',
        'STEAM_API_KEY',
        'SECURE_COOKIES_FOR_IFRAME',
        'TELEMETRY_ENABLED',
    ];

    fields.forEach((field) => {
        if (
            field === 'SECURE_COOKIES_FOR_IFRAME' ||
            field === 'TELEMETRY_ENABLED'
        ) {
            if (env(field).read() == 'true') {
                $(`#env_${field}`).prop('checked', true);
            } else {
                $(`#env_${field}`).prop('checked', false);
            }
            console.log(`${field} input created.`);
            return;
        }

        if (field == 'JWT_SECRET') return $(`#env_${field}`).val(genString(16));
        if (field == 'ENCRYPTION_TOKEN')
            return $(`#env_${field}`).val(genString(32));

        // @ts-expect-error
        $(`#env_${field}`).val(`${env(`${field}`).read() || ''}`);
        console.log(`${field} input created.`);
    });
};

let textEditor: any;
const loadTextEnv = () => {
    // @ts-expect-error - Ace editor is loaded externally
    ace.config.set('basePath', fromRoot('/packages/ace/'));
    // @ts-expect-error - Ace editor is loaded externally
    textEditor = ace.edit('env_code_editor');
    textEditor.setTheme('ace/theme/twilight');
    textEditor.session.setMode('ace/mode/dot');
    textEditor.setValue(
        fs.readFileSync(`${storage('cadDir').read()}/.env`, 'utf8'),
        -1
    );
};

const saveTextEnv = () => {
    fs.writeFileSync(`${storage('cadDir').read()}/.env`, textEditor.getValue());
    toast.success('Saved .env file');
    modal('#env_code').close();
};
