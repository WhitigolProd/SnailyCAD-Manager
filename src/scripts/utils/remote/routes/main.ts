const mainRoute = express.Router();

mainRoute.get('/', (req: any, res: any) => {
    // res.render('index');
    if (req.session.auth) {
        res.render('index');
        return;
    }
    res.redirect('/auth');
});

module.exports = mainRoute;
