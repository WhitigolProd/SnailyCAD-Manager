const authRoute = express.Router();

authRoute.get('/', (req: any, res: any) => {
    res.render('auth');
});

authRoute.post('/check', (req: any, res: any) => {
    const { password } = req.body;
    if (!password) {
        res.send({
            success: false,
            message: 'No Password Provided',
        });
        return;
    }
    if (password === storage('remotePassword').read()) {
        req.session.auth = true;
        res.json({
            success: true,
            message: 'Authenticated',
        });
        return;
    }
    res.send({
        success: false,
        message: 'Incorrect Password',
    });
});

module.exports = authRoute;
