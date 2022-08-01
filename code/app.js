const express = require('express');

const app = express();

app.listen(4000, () => {
    console.log("sever running at http://127.0.0.1:4000");
})

//重定向中间件
const urlRedirect = (req, res, next) => {
    res.redirect(301, '/index.html');
}

app.get('/', (req, res) => {
    console.log(req.url);
    res.send('hello');
})

app.use(express.static('class'));