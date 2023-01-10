let zoom = 1;
$('body').css('transform', `scale(${zoom})`);

ipc.on('zoom-in', () => {
    if (zoom >= 1.5) return toast.info("You can't zoom in anymore");
    zoom += 0.1;
    $('body').css('transform', `scale(${zoom})`);
});

ipc.on('zoom-out', () => {
    if (zoom <= 0.5) return toast.info("You can't zoom out anymore");
    zoom -= 0.1;
    $('body').css('transform', `scale(${zoom})`);
});

ipc.on('zoom-reset', () => {
    zoom = 1;
    $('body').css('transform', `scale(${zoom})`);
});

ipc.on('reload', () => {
    app.restart();
});
