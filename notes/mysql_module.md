## 在项目中操作mysql数据库

1. 安装mysql第三方模块
   
   ```bash
   npm install mysql
   ```

2. 通过模块连接到mysql数据库
   
   ```js
   const mysql = require('mysql');
   
   const db = mysql.createPool({
       host: '127.0.0.1',
       user: 'root',
       password: 'chenkexu',
       database: 'node-test'
   })
   ```

3. 使用sql操作数据库
   
   ```js
   db.query('sql语句', (err, results) => {
       if(err) return console.log(err.message);
       console.log(results);//使用result
   }
   ```

### `db.query`操作数据库

#### 查询

results为一个数组，里面查询结果的每一行为一个对象

***

#### 插入

1. 先得到数据对象
   
   ```js
   const newUser = { username: 'xiaomign', passward: 'abc123'}
   ```

2. 确定插入sql格式，其中数据使用`？`占位
   
   ```js
   const insertStr = 'INSERT INTO users (usernamem, passward)\
   VALUES (?, ?)'
   ```

3. `db.query`执行sql语句，通过数据对象属性数组的方式传入数据
   
   ```js
   db.query(insertStr, [newUser.username, newUser.passward], (err, results) => {
     if(err) return console.log(err.message);
     if(results.affectedRows === 1) console.log('插入成功‘);
   })
   ```
   
   通过`results.affectedRows`判断是否更新成功

**简便写法**：

当**数据对象的属性**和**表的字段**一一对应时，可以使用`INSERT INTO SET`简单的填充数据

```js
const sqlStr = 'INSERT INTO users SET ?';
//直接传入数据对象
db.query('sqlStr', newUser, (err, results){
    if(err) return console.log(err.message);
    if(results.affectedRows === 1) console.log('插入成功‘);
})
```

***

#### 更新

同样是使用`？`占位

```js
const user = {id: 5, username: 'abc', passward: '123'}

const sqlStr = 'UPDATE users SET username=?, passward=? WHERE id=?';

db.query(sqlStr, [user.username, user.passward, user,id], (err, results)=>{
    if(err) return console.log(err.message);
    if(results.affectedRows === 1) console.log('数据更新成功‘);
})
```

同样是通过`results.affectedRows`判断数据是否更新

**简单写法**

数据属性名与表字段名相符时

```js
const sqlStr = 'UPDATE users SET ? WHERE id=?';
//传入user和它的id，而不是每个属性
db.query(sqlStr, [user, user,id], (err, results)=>{
    if(err) return console.log(err.message);
    if(results.affectedRows === 1) console.log('数据更新成功‘);
})
```

***

#### 删除

```js
const sqlStr = 'DELETE FROM users id=?';
//删除了id为7的数据
db.query(sqlStr, 7, (err, result) => {
    if(err) return console.log(err.message);
    if(results.affectedRows === 1) console.log('数据删除成功‘);
})
```

**不要轻易使用删除语句**，如果需要有删除操作时，可以使用假删除代替，即标记数据为**已删除**，但仍然存在。（例如修改数据的isDeleted属性， 若已删除则设置为1，没有则为0）
