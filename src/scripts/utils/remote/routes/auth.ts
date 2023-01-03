const authRoute = express.Router();

authRoute.get('/', (req: any, res: any) => {
    // Redirect if the user is already authenticated
    if (req.session.auth) return res.redirect('/');
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

authRoute.post('/logout', (req: any, res: any) => {
    req.session.auth = false;
    res.redirect('/auth');
});

module.exports = authRoute;
