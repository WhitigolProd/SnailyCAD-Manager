const path = require(`path`);
const express = require('express');
const bodyParser = require('body-parser');
const { config, appStorage } = require('./exports');
require('./exports');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, `../styles/`)));
app.use(express.static(path.join(__dirname, './')));
app.use(express.static(path.join(__dirname, '../img/')));
app.use(express.static(path.join(__dirname, './app')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', { exp: appStorage, config: config });
});

module.exports = function () {
    app.listen(config.express.port, config.express.ip, function () {
        console.log(
            `Server Running @ ${config.express.ip}:${config.express.port}`
        );
    });
};

//! Routers
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

module.exports();
