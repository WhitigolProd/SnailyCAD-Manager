const appAPI = express();
const bodyParser = require('body-parser');

appAPI.use(bodyParser.urlencoded({ extended: true }));

appAPI.listen('30789', () => {
    log('Manager API Started — Running on port 30789', 'success');
});

appAPI.get('/', (req: any, res: any) => {
    checkAppVersion();
    res.json({
        message: 'API Ready',
    });
});

appAPI.post('/start', async (req: any, res: any) => {
    if (req.body.shift) {
        cadProcess = spawn(
            'node E:/_Web_Development_/.testing/express/index.js',
            [],
            { shell: true }
        );
    }

    cadProcess.stdout.on('data', (data: any) => {
        data = data.toString();
        console.log(data);
    });

    await res.json({
        status: 'Success',
    });
});
