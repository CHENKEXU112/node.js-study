#### 创建项目

- 将`node.modules`添加到`gitignore`文件，不要将包上传到github上面

- 在创建新项目时，使用`npm init -y`命令创建`package.json`文件，记录包的信息

- 项目目录需要使用英文，且没有空格

#### 通过package.json配置依赖包

`npm install`一次性安装

#### 卸载包

`npm uninstall 包名`

#### 只在开发时使用的包

记录到devDependencies节点中

使用`npm install 包名 -D`自动添加

#### 包的结构

- package.json
  
  ```js
  {
      "name": "包名",
      "version":"包的版本",
      "main": "包的入口"
      "description": "包的描述",
      "keywords": ["搜索的关键字"],
      "license": "ISC"开源协议
  }
  ```

- main.js包的入口文件，里面引用所有的功能模块

- /src目录，储存功能模块

- README.md文档
