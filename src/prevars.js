//! jQuery Initialization - DO NOT TOUCH THIS SECTION !//
window.$ = window.jQuery = require('jquery');
//! ------------------------------------------------- !//

//! All Requires !//
// Add Powershell Support - DO NOT TOUCH THIS SECTION
const { exec, spawn } = require('child_process');
const popup = require('sweetalert2');
const os = require('os');
const uuid = os.userInfo().username;
const fs = require('fs');
let notif = new Notyf();
const parsenv = require('parsenv');
const { ipcMain } = require('electron');
//! ------------ !//

// Get Initial Configuration
let config = {
    //? User Storage
    cadDir: localStorage.getItem('cadDir'),
    cadPort: localStorage.getItem('cadPort'),
    cadAPI: localStorage.getItem('cadAPI'),
    nodeEnv: 'production',
    color: localStorage.getItem('color'),
    autoStart: localStorage.getItem('autoStart'),
    openOnStartup: localStorage.getItem('openOnStartup'),
    firstRun: localStorage.getItem('firstRun'),
};

if (localStorage.length > 0) {
    appenv = require('dotenv').config({ path: `${__dirname}/.env` });
    cadenv = require('dotenv').config({ path: `${config.cadDir}/.env` });
    parsenv.config({
        path: `${config.cadDir}/.env`,
        encoding: 'utf8',
        debug: false,
    });

    cad = {
        env: {
            POSTGRES_PASSWORD: cadenv.parsed.POSTGRES_PASSWORD,
            POSTGRES_USER: cadenv.parsed.POSTGRES_USER,
            DB_HOST: cadenv.parsed.DB_HOST,
            DB_PORT: cadenv.parsed.DB_PORT,
            POSTGRES_DB: cadenv.parsed.POSTGRES_DB,
            JWT_SECRET: cadenv.parsed.JWT_SECRET,
            ENCRYPTION_TOKEN: cadenv.parsed.ENCRYPTION_TOKEN,
            CORS_ORIGIN_URL: cadenv.parsed.CORS_ORIGIN_URL,
            NEXT_PUBLIC_PROD_ORIGIN: cadenv.parsed.NEXT_PUBLIC_PROD_ORIGIN,
            DOMAIN: cadenv.parsed.DOMAIN,
            SECURE_COOKIES_FOR_IFRAME: cadenv.parsed.SECURE_COOKIES_FOR_IFRAME,
            PORT_API: cadenv.parsed.PORT_API,
            PORT_CLIENT: cadenv.parsed.PORT_CLIENT,
            NODE_ENV: cadenv.parsed.NODE_ENV,
            DATABASE_URL: cadenv.parsed.DATABASE_URL,
            TELEMETRY_ENABLED: cadenv.parsed.TELEMETRY_ENABLED,
        },
    };
}

// Store Download Links to System Requirements
let links = {
    node: ``,
};

let app = {
    env: null,

    versions: {
        current: '1.0.1', // Must be set before releasing each update.
        latest: null, // Sets Dynamically
        skipUpdate: false, // Whether to skip updating the latest version (Updates Dynamically).
    },
    links: {
        manager: {
            docs: `https://cad-manager.cossys.tk/`,
            download: `https://github.com/WhitigolProd/SnailyCAD-Manager/releases/latest`,
            report: `https://github.com/WhitigolProd/SnailyCAD-Manager/issues/new/choose`,
        },
        cad: {
            github: 'https://github.com/SnailyCAD/snaily-cadv4',
            docs: 'https://cad-docs.caspertheghost.me/',
        },
    },
};

//? Status of CAD (Set Dynamically)
let st = {
    cad: localStorage.getItem('cadStatus'),
};

//? Display CAD Directory
$(() => {
    $(`.versions #directory span`)
        .css('opacity', '.5')
        .text(`${config.cadDir}`);
});

const setStatus = {
    cad: function (status) {
        localStorage.setItem('cadStatus', `${status}`);
        st.cad = `${status}`;
    },
};

let pre = {
    coreDir: __dirname,
}

// Keep Dependencies Up to Date
$(()=> {
    exec(`cd ../ && npm i`, {cwd: `${__dirname}`})
})