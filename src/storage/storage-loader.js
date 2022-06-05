//so basically the reason this is here is to load the json files
//and then have users set their options in the UI and set those
//values with the fs library

const { readFile } = require('fs');

let config = readFile('./src/storage/config.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    return data;
  });