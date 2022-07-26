const qs = require('querystrings');


const urlencoded = function(req, res, next) {
    // 监听req.data事件，并将其结果chunk拼接起来
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    });
    // 数据传输完成后，通过qs.parse模块进行数据处理
    req.on('end', () => {
        const body = qs.parse(str);
        console.log(body);
        // 挂载到req上
        req.body = body;
        // 调用next
        next();
    })
}

module.exports = urlencoded;