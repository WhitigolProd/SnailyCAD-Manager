//? Version Check ?//
let currentversion = null;
let latestversion = null;;

$(function(){
    //Current Version Check
    (function(){
        let user = require("os").userInfo().username;
        let snailyjson = require(`C:/Users/${user}/Documents/snaily-cadv4/package.json`);
        
        elements.versions.current.text(`${snailyjson.version}`)
        console.log(`Current Version: ${snailyjson.version}`);
        currentversion = `${snailyjson.version}`
    }());
    
    // Latest Version Check
    (function() {
        let ghpath = 'SnailyCAD/snaily-cadv4';
        let api = `https://api.github.com/repos/${ghpath}/tags`
    
        $.get(api).done(function (data) {
            var versions = data.sort(function (v1, v2) {
              return semver.compare(v2.name, v1.name)
            });
            console.log(`Latest Version: ${versions[0].name}`);
            elements.versions.latest.text(versions[0].name);
            latestversion = `${versions[0].name}`

            CompareVersions();
          });
    }());
    
    // Compare Versions
    function CompareVersions(){
        if (elements.versions.current.text() < elements.versions.latest.text()) {
            elements.versions.current.css('color', '#ffa600').append(` (Update <u>${latestversion}</u> Available)`)
            elements.titlebar.title.append(`&nbsp;<span style="color: orange;">(Update <u>${latestversion}</u> available)</span>`)
            console.log(`Versions ${elements.versions.current.text()} and ${elements.versions.latest.text()} do NOT match`)
        }else {
            elements.versions.current.css('color', 'lime').append(' (Up to Date)')

        }
    };
})
//? ------------- ?//