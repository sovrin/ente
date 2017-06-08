const http = require('http')

const bodyParser = require('body-parser')
const express = require('express')
const Primus = require('primus')
const fs = require('fs')

const app = express()
const connections = []

app.use(bodyParser())
app.use('/static', express.static('static'))

app.post('/send', (req, res, next) => {
    connections.forEach(spark => {
        console.log(spark.write(req.body.data))
    })

    res.end('kthxbye')
})

const httpServer = http.createServer(app)
const primus = new Primus(httpServer)

primus.on('connection', function (spark) {
    connections.push(spark)
});

const stream = fs.createWriteStream("static/primus.js");

stream.once('open', function(fd) {
    stream.write(primus.library());
    stream.end();
});

httpServer.listen(8080)