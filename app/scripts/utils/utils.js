"use strict";
const ipc = require("electron").ipcRenderer;
const path = require("path");
const { spawn, exec } = require("child_process");
const commandExists = require("command-exists");
const findProcess = require("find-process");
const app = {
    close: () => {
        return ipc.send("close");
    },
    minimize: () => {
        return ipc.send("minimize");
    },
    maximize: () => {
        return ipc.send("maximize");
    },
};
const fromRoot = (query) => {
    return path.join(__dirname, query);
};
const log = (string, type) => {
    if (type === "success")
        return console.log("%c" + string, "color: lime;");
    if (type === "info")
        return console.log("%c" + string, "color: lightblue;");
    if (type === "warning")
        return console.log("%c" + string, "color: orange;");
    if (type === "error")
        return console.log("%c" + string, "color: red;");
    if (type === "neutral")
        return console.log(string);
    console.log(string);
};
const launchURL = (url) => {
    log(`Launching URL: ${url}`, "info");
    return ipc.send("url", url);
};
