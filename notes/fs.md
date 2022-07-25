#### 异步

##### 打开文件

```js
fs.open(path, flags[, mode], callback)
```

回调函数有两个参数，err和fd文件描述符

```js
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});
```

flags文件打开参数（常用）：

1. r：读取模式

2. r+：读写模式

3. w：写入模式，不存在则创建

4. a：追加模式

5. a+：读取追加模式

##### 获取文件信息

```js
fs.stat(path, callback)
```

stats类的实例会被传递给回调函数，可以通过stats的方法判断文件的相关属性

例如

```js
var fs = require("fs");

console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");

   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
```

##### 写入文件

```js
fs.writeFile(file, data[, options], callback)
```

回调函数只包含err参数

```js
var fs = require("fs");

fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   //接着读取文件检查是否成功写入
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

##### 读取文件

```js
fs.read(fd, buffer, offset, length, position, callback)
```

- 需要作为`fs.open`的回调函数使用，读取`fs.open`传回的fd文件描述符

- 回调函数具有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。

```js
var fs = require("fs");
//获取一个1024字节大小的缓存空间
var buf = new Buffer.alloc(1024);
//以读写模式打开文件
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件：");
//偏移量为零，读取位置为文件开头
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + "  字节被读取");

      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});
```

- 按字符串读取
  
  ```js
  fs.readFile(path[,option],(err, datastr0{
      ...
  })
  ```

##### 关闭文件

```js
fs.close(fd, callback)
```

回调函数只有err参数，

在结束对文件的操作之后执行close

##### 截取文件

##### 删除文件

##### 创建目录

##### 读取目录

##### 删除目录

### 文件路径

使用`__dirname + '/filename'`代替相对路径，`__dirname`自动获取文件所在的目录路径
