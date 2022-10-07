"use strict";
/*
    !   Nothing in this file will be registered in intellisense (VSCode)
    !   To register modules in intellisense, use CommonJS syntax.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// * Import scripts to HTML
let scriptImports = [
    "/app/scripts/utils/utils.js",
    "/app/scripts/utils/storage.js",
    "/app/scripts/utils/requirements.js",
];
scriptImports.forEach((script) => {
    $(`head`).append(`<script src=".${script}" defer></script>`);
});
// * On page load
$(() => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => {
        $(`.mio`).removeClass("mio").addClass("material-symbols-outlined");
    }, 150);
    electron_1.ipcRenderer.send("focus");
    yield checkRequirements();
}));
// * Import HTML Partials
const includeHTML = () => {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("partial");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("partial");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
};
// * Execute the function to inject HTML partials.
includeHTML();
