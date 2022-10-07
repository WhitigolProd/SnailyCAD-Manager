"use strict";
const storage = {
    write: (key, value) => {
        return localStorage.setItem(key, value);
    },
    read: (key) => {
        return localStorage.getItem(key);
    },
};
// ! Current Storage Keys
/*
runWizard
 
*/
