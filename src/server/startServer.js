const express = require('express')
const config = require(`./config.json`)

const app = express()
const serverConfig = config.express;

app.use(express.static(`${__dirname}../../`))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../../src/` })
})

module.exports = function () {
    app.listen(serverConfig.port, function () {
    })
}

module.exports();