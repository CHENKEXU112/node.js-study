#### 引入path模块

```js
const path = require('path');
```

#### 路径拼接`path.join()`

```js
const correntPath = path.join(__dirname,'./files/1.txt');
```

#### 获取路径中的最后一个部分`path。basename()`

可以接受两个参数，第一个参数为一个路径，第二个参数为一种文件拓展名

- 只接受路径时，将会获取到路径最后一个部分的名称（常常是一个文件名）

- 接受两个参数时
  
  ```js
  const fpath = '/a/b/index.html';
  var nameWithouExt = path.basename(fpath, '.html')
  console.log('index' === nameWithoutExt)//yes
  ```

#### 获取文件拓展名`path.extname()`

```js
const fpath = '/a/b/index.html';
var extname = path.extname(fpath)
console.log(extname)//输出.html
```
