const remApp = express();

remApp.set('view engine', 'ejs');
remApp.set('views', fromRoot('/src/scripts/utils/remote/views'));
remApp.use(express.static(fromRoot('/app/styles/dist/')));

remApp.listen(storage('remPort').read() || '4000', () => {
    log(
        `Remote Server running @ 0.0.0.0:${
            storage('remPort').read() || '4000'
        }`,
        'success'
    );
});

remApp.get('/', (req: any, res: any) => {
    res.render('index');
});
