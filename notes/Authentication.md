对于服务器端渲染，推荐使用Session认证机制

对于前后端分离来说，推荐使用JWT认证机制

## Session认证机制

#### HTTP协议的无状态性

客户每次HTTP请求都是独立的，服务器不会主动表六每次HTTP请求的状态

#### Cookie

- 存储在用户浏览器中的一段不超过 4 KB 的字符串，它由一个**名称（name**），一个**值（value**）和其他几个用于控制 Cookie **有效期，安全性，使用范围**的**可选属性**组成

- 不同域名下的 Cookie 相互独立，客户端发起请求时，会自动把**当前域名下的所有未过期 Cookie**一起发送

- **特性**
  
  1. 自动发送
  
  2. 域名独立
  
  3. 具有时限
  
  4. 4 KB 的限制

- 客户**第一次请求数据**时，服务器会将 Cookie 通过**响应头**的形式，向客户端发送数据，客户端会将 Cookie 保存在浏览器中。
  
  之后的每次请求，浏览器**会自动**将 Cookie 通过请求头的形式发送给服务器，以此验证身份

- 不具有安全性，很容易被伪造，所以不能存储重要的隐私信息

#### 提高身份认证的安全性

session的工作原理，即服务器获取**客户的账号密码等身份信息**后将其储存起来，并**由此生成 Cookie** 返回给客户端；当客户端发送 Cookie 到服务器时，服务器会**根据 Cookie 查找客户信息**，再返回对应数据

#### express中使用session中间件进行身份认证

1. 安装express-session 中间件
   
   ```bash
   npm install express-session
   ```

2. 配置
   
   ```js
   const session = require('express-session');
   
   app.use(session({
       secret: 'any strings',//任意字符串，对session进行加密
       resave: false,
       saveUninitialized: true
   }))
   ```

3. 向 Session 中存储数据
   
   配置 Session 中间件后，可以将数据追加到`req.session`对象中
   
   ```js
   app.post('/api/login, (req, res) => {
       if ('登陆成功') {
           req.session.user = req.body;
           req.session.islogin = true;
           req.send({ status; 0, msg: '登陆成功' })
       }
   })
   ```

4. 从 Session 中访问数据
   
   通过`req.sesion`访问

5. 清空 Session
   
   调用`req.session.destroy()`函数，可以清空当前用户的 Session

## JSON Web Tokens(JWT) 认证机制

 Cookie默认不支持跨域访问, 这时需要做更多的设置, 使用JWT更加简便

- 服务端获得客户信息后，经过**加密生成 Token 字符串返回**给客户端，客户端将其**储存在 localstorage 或者sessionstorage**中，客户**再次请求时**通过**请求头的 authorization 字段**将 Token 发送给服务端，服务器端将其**解密后可获得**用户信息

- 组成部分：Header(头部)， Payload(有效荷载)， Signature(签名), 三者通过英文的"."分隔

- Payload 部分为真正的用户信息, 它由用户信息加密而来
  
  Header 和 Signature 时安全性相关的部分, 保证了 Token 的安全性

#### 客户端使用

在请求头中的 Authorization 字段中加入 JWT

```js
Authorizatin: Bearer <token>
```

#### 在express中使用JWT

1. 安装
   
   ```bash
   npm install jsonwebtoken express-jwt
   ```
   
   前一个用于生成 JWT 字符串, 后一个用于将 JWT 字符串还原为 JSON对象

2. 配置, 导入

3. 定义 secret 密钥, 生成和还原 JWT时使用
   
   ```js
   const secretKey = 'secret key';
   ```

4. 登陆成功后生成 JWT 字符串
   
   ```js
   app.post('url', (req, res) => {
       //登陆成功后
       res.send({
           status: 200,
           message: '登陆成功',
           //jwt.sign的三个参数分别为
           //用户信息对象, 加密密钥, 配置对象
           token: jwt.sign({ username: userinfo.username }, secretKey, {  expiresIn: '30s' })
       })
   }
   ```
   
   此处的 expireIn 为 token 的有效期

5. 将 JWT 还原为 JSON 对象
   
   ```js
   const expressJWT = require('express-jwt');
   
   app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] })
   ```
   
   unless指令用来指定不需要访问权限的接口, 此为 /api

6. 使用 req.user 获取用户信息
   
   通过 express-jwt 中间件处理后, 用户信息会被保存在 req.user对象 中

7. 捕获解析 JWT 失败后的错误
   
   通过 express 的**错误中间件**捕获
   
   ```js
   app.use(( err, req, res, next ) => {
       if (err.name === 'UnauthorizedError'){
           return res.send({ status: 401, message: '无效的token' });
       }    
       res.send({  status: 500, message: '发生未知错误'})
   })
   ```
