const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
    // console.log(req);
    const url = req.url;
    if (url === '/') {
        url = '/index.html'
    }
    let fpath = path.join(__dirname, '/class', url)
    fs.readFile(fpath, 'utf-8', (err, data) => {
        if (err) return console.log(err);
        res.end(data)
    })

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
})

server.listen(5000, () => {
    console.log('start! server running at http://127.0.0.1:5000');
})