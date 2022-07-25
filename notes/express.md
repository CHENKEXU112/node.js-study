### 基础

##### 启动服务器和响应请求

```js
//建立服务器
const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("sever running at http://127.0.0.1:3000");
})


//响应get请求（post请求类似）
app.get('url', (req, res) => {
    //发送数据
    res.send('hello');
})
```

##### 获取url查询字符串`req.query`,并且自动转换为对象类型

```js
app.get('/url?name=zs&age=20', (req, res) => {
    //客户端查询字符串：?name=zs&age=20
    console.log(req.query)
    //输出{name: zs, age: 20}
})
```

##### `req.params`获取动态参数

```js
//键名为id，可以添加多个，如/url/:id/:age
app.get('/url/:id', (req, res) => {
    //客户端传回/url/1
    console.log(req.params)
    //输出{id: 1}
})
```

### express.static托管静态资源

创建静态资源服务器，将静态资源文件夹中的图片，html，css，js文件对外开放

##### 使用

```js
app.use(express.static('public'));
//将public文件夹中的文件对外开放
```

也可以添加目录前缀，访问该资源时必须使用该前缀，比如

```js
app.use('/public', express.static('public');
```

##### 外界访问

**没有指定访问前缀时**，可以直接通过`url/images/1.jpg`访问图片，没有包含public文件夹路径。若指定了，只需添加上，如`url/public/images/1.jpg`



### express路由

分为三部分，请求类型，请求路径，处理函数，例如`app.get()`和`app.post()`

##### 路由的匹配

按照**定义顺序**匹配

当**请求类型和路径都匹配成功**后才会调用处理函数

##### 模块化路由

###### 步骤

1. 创建路由模块对应js文件

2. 调用`express.router()`创建路由对象
   
   ```js
   var express = require('express');
   car router = express.Router();
   ```

3. 在路由对象上挂载具体的路由
   
   ```js
   router.get('url'.function(req, res){...})
   router.post('url',function(req, res){...})
   ```

4. 使用`module。exports`向外共享路由对象
   
   ```javascript
   module.exports = router
   ```

5. 使用`app.use()`注册路由模块
   
   1. 导入路由模块
      
      ```js
      const router = require('./router.js)
      ```
   
   2. 注册路由模块
      
      ```js
      app.use(router)
      ```

###### 为路由模块添加访问前缀

```js
const userRouter = require('./router/user.js');

app.use('/api', userRouter);
```

此后每次访问路由时需要添加访问前缀

### 中间件

一个请求到达express服务器的时候，可以连续调用多个中间件，从而对这次请求进行预处理。最后交由路由处理 

##### 作用

多个中间件之间**共享同一份req和res**，可以在上游的中间件中为req和res**添加自定义属性和方法**，并在下游的中间件或路由中调用。

##### 格式

```js
app.get('url', function(req, res, next){
    ...
    next();
})
```

与路由相似，但多了一个next函数的调用

##### next函数

它把流转关系转交给下一个中间件或路由，实现了多个中间件的连续调用

##### 定义中间件函数

```js
const mw = function(req, res, next){
    ...
    next();
}
```

使用常量保存

##### 全局生效的中间件

任何请求到达服务器后都会触发的中间件调用`app.use(中间件函数)`即可全局注册





### 创建API接口

### cors跨域资源共享
