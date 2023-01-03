const apiRoute = express.Router();

apiRoute.get('/', (req: any, res: any) => {
    res.render('api');
});

apiRoute.get('/status/client', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
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
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
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

apiRoute.get('/status/cad', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.json({
        cadLoading,
        client_status,
        api_status,
    });
});

apiRoute.get('/version/app', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.send(versions.app);
});

apiRoute.get('/version/cad', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.send(versions.cad);
});

// Control Routes
apiRoute.post('/control/start', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.json({
        success: true,
        message: 'Starting CAD',
    });
    startCad();
});

apiRoute.post('/control/stop', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.json({
        success: true,
        message: 'Stopping CAD',
    });
    stopCad();
});

apiRoute.get('/env/read', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    res.send(fs.readFileSync(path.join(storage('cadDir').read(), '.env')));
});

apiRoute.post('/env/save', (req: any, res: any) => {
    if (!req.session.auth)
        return res.json({
            success: false,
            message: 'You are not authorized to do this',
        });
    fs.writeFileSync(path.join(storage('cadDir').read(), '.env'), req.body.env);
    res.json({
        success: true,
        message: 'Saved .env file',
    });
});

module.exports = apiRoute;
