### 启动服务器

1. ##### 导入http模块
   
   ```js
   const http = require('http');
   ```

2. ##### 创建web服务器实例
   
   ```js
   const server = http.createServer();
   ```

3. ##### 为服务器实例绑定`request`事件
   
   ```js
   serve.on('request', (req, res) =>{
     ...
   })
   ```

4. ##### 启动服务器
   
   ```js
   server.listen(80, ()=>{
     ...
   })
   ```

### 绑定request事件

回调函数返回两个参数`res req`对象

- req可以获取客户端相关信息，如`req.url`和`req.method`

- res响应对象，获取服务器的属性和方法，如`res.end()`将数据响应给客户端
  
  `res.setHeader()`设置响应头信息（防止页面中文乱码）
  
  ```js
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  ```

### 根据不同url响应不同页面内容

1. 获取用户访问的url

2. 根据url响应不同的数据

### 将页面静态资源上传到服务器

1. 根据客户端访问的url地址，打开磁盘中对应的文件

2. 将文件中的字符串通过`res.end()`返回给页面
