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
) => {
    return new envClass(selector);
};
