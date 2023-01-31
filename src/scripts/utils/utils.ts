const fromRoot = (query: string) => {
    return path.join(__dirname, query);
};

const ipc = require('electron').ipcRenderer;
const path = require('path');
const { spawn, exec } = require('child_process');
const commandExists = require('command-exists');
const findProcess = require('find-process');
const pm2 = require('pm2'); // * For Remote Server
const express = require('express');
const killPort = require('kill-port');
const fs = require('fs');
const convertAnsi = require('ansi-to-html');
const mdConvert = new (require('showdown').Converter)();
const isPostgres = require('is-postgres');

const app = {
    close: () => {
        return ipc.send('close');
    },
    minimize: () => {
        return ipc.send('minimize');
    },
    maximize: () => {
        return ipc.send('maximize');
    },
    restart: () => {
        location.reload();
    },
    hard_restart: () => {
        return ipc.send('hard-restart');
    },
};

// Clear the log file on startup
fs.writeFile(fromRoot('../logs/app.log'), '', (err: string) => {
    if (err) {
        toast.error(err);
    }
});
const log = (
    string: string,
    type: 'success' | 'info' | 'warning' | 'error' | 'neutral'
) => {
    const scrollBottom = () => {
        return $('.logs').scrollTop($('.logs').prop('scrollHeight'));
    };

    const convert = new convertAnsi({
        newline: true,
        escapeXML: true,
    });
    const oldString = string;
    string = convert.toHtml(string);

    // Change system message to the log string
    $('#system_message').html(string);

    // Write to the log file
    fs.appendFile(
        fromRoot('../logs/app.log'),
        oldString + '\n',
        (err: string) => {
            if (err) {
                toast.error(err);
            }
        }
    );

    if (type === 'success') {
        $('.logs').append(`<span style="color: lime;">${string}</span>`);
        scrollBottom();
        return console.log('%c' + string, 'color: lime;');
    }
    if (type === 'info') {
        $('.logs').append(`<span style="color: lightblue;">${string}</span>`);
        scrollBottom();
        return console.log('%c' + string, 'color: lightblue;');
    }
    if (type === 'warning') {
        $('.logs').append(`<span style="color: orange;">${string}</span>`);
        scrollBottom();
        return console.log('%c' + string, 'color: orange;');
    }
    if (type === 'error') {
        $('.logs').append(`<span style="color: #ff5757;">${string}</span>`);
        scrollBottom();
        return console.log('%c' + string, 'color: #ff5757;');
    }
    if (type === 'neutral') {
        $('.logs').append(string);
        scrollBottom();
        return console.log(oldString);
    }
    $('.logs').append(`<span>${string}</span>`);
    scrollBottom();
    console.log(oldString);
};

const launchURL = (url: string) => {
    log(`Launching URL: ${url}`, 'info');
    return ipc.send('url', url);
};

const modalClass = class {
    selector;

    constructor(selector: string) {
        this.selector = selector;
    }

    open() {
        $('dialog').removeAttr('open');
        if (this.selector == 'output_log') {
            $('.logs').scrollTop($('.logs').prop('scrollHeight'));
        }

        $(this.selector).attr('open', '');
    }
    close() {
        // Reset Scroll Posotion even if it's not open
        $(this.selector).children('article').scrollTop(0);

        $(this.selector).removeAttr('open');
    }
};

const modal = (querySelector: string) => {
    return new modalClass(querySelector);
};

const utilsClass = class {
    query: any;

    constructor(query: any) {
        this.query = query;
    }

    toString() {
        // * Convert query to string
        return `${this.query}`;
    }
};

let cadProcess: any;

const api = {
    get: (query: string, cb: (data: any, err: any) => void) => {
        $.get(`http://localhost:30789${query}`)
            .then((data) => {
                return cb(data, undefined);
            })
            .catch((err) => {
                return cb(undefined, err);
            });
    },
    post: (query: string, data: object, cb: (data: any, err: any) => void) => {
        $.post(`http://localhost:30789${query}`, data)
            .then((data) => {
                return cb(data, undefined);
            })
            .catch((err) => {
                return cb(undefined, err);
            });
    },
};

const executeStartFunction = async () => {
    if (storage('start-func').read()) {
        let func = storage('start-func').read();
        eval(func);
        localStorage.removeItem('start-func');
    }
};

const genString = (length: number) => {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const elements = {};
