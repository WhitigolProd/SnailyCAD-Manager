const express = require('express')

const app = express()
const port = 5000

app.use(express.static(`${__dirname}../../`))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../../src/` })
})

module.exports = function () {
    app.listen(port, function () {
    })
}

module.exports();