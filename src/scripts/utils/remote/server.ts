const remApp = express();
let remoteProcess: any;
const session = require('express-session');

remApp.set('view engine', 'ejs');
remApp.set('views', fromRoot('/src/scripts/utils/remote/views'));
remApp.use(express.static(fromRoot('/app/styles/dist/')));
remApp.use(express.static(fromRoot('/app/scripts/utils/remote/app')));
remApp.use('/public', express.static(fromRoot('/public/')));
remApp.use('/ace', express.static(fromRoot('/packages/ace/')));
remApp.use(express.urlencoded({ extended: true }));
remApp.use(
    session({
        secret: genString(10),
        resave: false,
        saveUninitialized: false,
    })
);

const startRemoteServer = () => {
    if (
        storage('remotePort').read() !== '' &&
        storage('remotePassword').read() !== ''
    ) {
        let remotePort = storage('remotePort').read();
        remoteProcess = remApp.listen(`${remotePort}`, () => {
            log(`Remote Server Running @ [::]:${remotePort}`, 'success');
            toast.info(`Remote Server Running @ [::]:${remotePort}`);
            $('#remote_server_status')
                .text('Online')
                .removeClass('text-red-500')
                .addClass('text-green-500');
            $('#start_remote_server').addClass('hidden');
            $('#stop_remote_server').removeClass('hidden');
        });
    }
};

const stopRemoteServer = () => {
    $('#stop_remote_server').addClass('hidden');
    $('#remote_server_status')
        .removeClass('text-green-500')
        .addClass('text-orange-500')
        .text('Stopping');
    remoteProcess.close(() => {
        log(`Remote Server Stopped`, 'success');
        toast.info('Remote Server Stopped');
        $('#remote_server_status')
            .text('Offline')
            .removeClass('text-green-500')
            .addClass('text-red-500');
        $('#start_remote_server').removeClass('hidden');
        $('#stop_remote_server').addClass('hidden');
    });
};

// Routes
remApp.use('/', require(fromRoot('/app/scripts/utils/remote/routes/main')));
remApp.use('/api', require(fromRoot('/app/scripts/utils/remote/routes/api')));
remApp.use('/auth', require(fromRoot('/app/scripts/utils/remote/routes/auth')));
