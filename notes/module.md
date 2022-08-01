#### 加载模块`require`

可以加载**内置模块**，**自定义模块**和**第三方模块**

```js
//系统模块

const fs = require('fs');

//自定义模块，可以省略后缀名.js，必须使用./标识
const time = require('./folder/time.js');

//第三方，需下载
const moment = require('moment')
```

#### module对象和模块作用域

- **模块作用域**：默认情况下模块中的变量只能在模块中（比如单个js文件）被访问

- **module对象**：存储了模块有关信息

**使用`module.exports`向外共享成员**，外界通过`require`导入的对象就是`exports`包含的成员

#### module.exports的使用

在模块中使用`module.exports`指定要导出的数据

```js
module.exports = {
    age: 12,
    sex: '男'
}
```

在使用模块时，变量接受到的就是该对象

```js
const kid = require('./kid')

console.log(kid);//{age: 12, sex: '男'}
```

**`exports`和`module.exports`指向同一对象，但最后导出的是`module.exports`指向的对象（如果改变了的话）**
