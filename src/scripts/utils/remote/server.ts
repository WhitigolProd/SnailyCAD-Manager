const remApp = express();

remApp.set('view engine', 'ejs');
remApp.set('views', fromRoot('/src/scripts/utils/remote/views'));
remApp.use(express.static(fromRoot('/app/styles/dist/')));

const startRemoteServer = () => {
    if (storage('remPort').read() != 'null') {
        let remotePort = storage('remPort').read();
        remApp.listen(`${remotePort}`, () => {
            log(`Remote Server Running @ [::]:${remotePort}`, 'success');
        });
    } else {
        toast.warning('Could not start remote server: Not Configured');
        return;
    }
};

remApp.get('/', (req: any, res: any) => {
    res.render('index');
});
