//! jQuery Initialization - DO NOT TOUCH THIS SECTION !//
window.$ = window.jQuery = require('jquery');
//! ------------------------------------------------- !//

//! All Requires !//
// Add Powershell Support - DO NOT TOUCH THIS SECTION
const { exec, spawn } = require('child_process');
const package = require(`../package.json`);
const popup = require('sweetalert2');
const os = require('os');
const uuid = os.userInfo().username;
const fs = require('fs');
let notif = new Notyf();
const parsenv = require('parsenv');
const { ipcMain, ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const updateFile = './update.json';
const update = require('./update.json');
const path = require('path');
const showdown = require(`showdown`);
const convert = new showdown.Converter();
const pm2 = require('pm2');
//! ------------ !//

// Get Initial Configuration
let config = {
    //? User Storage
    cadDir: localStorage.getItem('cadDir'),
    cadPort: localStorage.getItem('cadPort'),
    cadAPI: localStorage.getItem('cadAPI'),
    nodeEnv: 'production',
    firstRun: localStorage.getItem('firstRun'),
    enableWebServer: localStorage.getItem('enableWebServer'),
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
            DISCORD_BOT_TOKEN: cadenv.parsed.DISCORD_BOT_TOKEN,
            DISCORD_SERVER_ID: cadenv.parsed.DISCORD_SERVER_ID,
            DISCORD_CLIENT_ID: cadenv.parsed.DISCORD_CLIENT_ID,
            DISCORD_CLIENT_SECRET: cadenv.parsed.DISCORD_CLIENT_SECRET,
            STEAM_API_KEY: cadenv.parsed.STEAM_API_KEY,
        },
    };
}

// Store Download Links to System Requirements
let links = {
    node: ``,
};

let updateError = false;
let app = {
    env: null,

    versions: {
        current: '1.0.4', // Must be set before releasing each update.
        latest: null, // Sets Dynamically
        skipUpdate: false, // Whether to skip updating the latest version (Updates Dynamically).
    },
    links: {
        manager: {
            docs: `https://cad-manager.cossys.tk/`,
            download: `https://github.com/WhitigolProd/SnailyCAD-Manager/releases/latest`,
            report: `https://app.bluecatforms.com/rhLYqQQ9/bug-report`,
            env: `https://cad-manager.cossys.tk/guides/.env-file`,
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
    $(`#directory`)
        // .css('opacity', '.5')
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
};

// Update package.json
$(() => {
    if (package.version < app.versions.current) {
        $(`msg`)
            .html(
                `<h2 aria-busy="true">Updating Packages</h2><p>The app will restart automatically once complete.</p>`
            )
            .show();
        fs.writeFile(
            path.join(__dirname, '../package.json'),
            JSON.stringify(update.newPackage, null, 2),
            (err) => {
                if (err) console.error(err);
            }
        );

        exec(
            `cd ../ && npm i`,
            { cwd: `${__dirname}` },
            (err, stdout, stderr) => {
                if (err) alert(err);
                if (stdout) location.reload();
                if (stderr) alert(stderr);
            }
        ); // Install/Update Dependencies
    }
});

let startBusy = false; // Tells the app if the start button can't be pressed.
