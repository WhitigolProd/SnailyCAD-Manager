const apiRoute = express.Router();

apiRoute.get('/', (req: any, res: any) => {
    res.render('api');
});

apiRoute.get('/status/client', (req: any, res: any) => {
    if (client_status) {
        res.send({
            online: true,
        });
        return;
    }
    res.send({
        online: false,
    });
});

apiRoute.get('/status/api', (req: any, res: any) => {
    if (api_status) {
        res.send({
            online: true,
        });
        return;
    }
    res.send({
        online: false,
    });
});

module.exports = apiRoute;
