function HandleUpdateButton(){
    if (ver.current == ver.latest) {
        elements.main.buttons.update.css('display', 'none');
    }
}

$(elements.main.buttons.start).on('click', ()=>{
    command(`yarn run concurrently "yarn workspace @snailycad/client start" "yarn workspace @snailycad/api generate && yarn workspace @snailycad/api start"`, `C:\\Users\\${uuid}\\Documents\\snaily-cadv4`)
})