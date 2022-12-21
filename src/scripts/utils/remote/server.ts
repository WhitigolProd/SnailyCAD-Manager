const remApp = express();

remApp.set('view engine', 'ejs');
remApp.set('views', fromRoot('/src/scripts/utils/remote/views'));
remApp.use(express.static(fromRoot('/app/styles/dist/')));

const startRemoteServer = () => {
    if (storage('remoteOnStart').read() && storage('remotePort').read()) {
        let remotePort = storage('remotePort').read();
        remApp.listen(`${remotePort}`, () => {
            log(`Remote Server Running @ [::]:${remotePort}`, 'success');
            $('#remote_server_status')
                .text('Online')
                .removeClass('text-red-500')
                .addClass('text-green-500');
            $('#start_remote_server').hide();
            $('#stop_remote_server').show();
        });
    }
};

const stopRemoteServer = () => {
    remApp.close(() => {
        log('Remote Server Stopped', 'success');
        toast.success('Remote Server Stopped');
        $('#remote_server_status')
            .text('Offline')
            .removeClass('text-green-500')
            .addClass('text-red-500');
        $('#start_remote_server').show();
        $('#stop_remote_server').hide();
    });
};

remApp.get('/', (req: any, res: any) => {
    res.render('index');
});
