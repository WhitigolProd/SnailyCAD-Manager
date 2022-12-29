const mainRoute = express.Router();

mainRoute.get('/', (req: any, res: any) => {
    res.render('index');
});

module.exports = mainRoute;
