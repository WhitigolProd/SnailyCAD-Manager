/*
    !   Nothing in this file will be registered in intellisense (VSCode)
    !   To register modules in intellisense, use CommonJS syntax.
*/

import { ipcRenderer } from "electron";
import * as fs from "fs";
import * as path from "path";

// * Import scripts to HTML
let scriptImports = [
  "/app/scripts/utils/utils.js",
  "/app/scripts/utils/storage.js",
  "/app/scripts/utils/requirements.js",
  "/app/scripts/utils/versions.js",
  "/app/scripts/utils/wizard.js",
];

scriptImports.forEach((script) => {
  $(`head`).append(`<script src=".${script}" defer></script>`);
});

// * On page load
$(async () => {
  setInterval(() => {
    $(`.mio`).removeClass("mio").addClass("material-symbols-outlined");
  }, 150);
  ipcRenderer.send("focus");
  await checkRequirements();
  console.log(
    `Okay... But why Snaily? Hmm.. Probably FiveM's mascot Snail.. Or maybe not 🤔👀`
  );
});

// * Import HTML Partials
const includeHTML = () => {
  var z, i, elmnt: any, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("partial");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("partial");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
};

// * Execute the function to inject HTML partials.
includeHTML();
