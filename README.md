## 安装依赖包
```cmd
npm install
```
## 运行项目
```cmd
npm run dev
```

## 打包项目
```cmd
npm run build
```

## app为nodejs+express搭建的服务器
1. 把打包后的文件直接放到static
2. `npm i` 安装依赖包
3. `npm start` 运行
4. url为`localhost:3000`

## 用express搭建一个小型服务器
1. 全局安装express `npm i express -g`
2. 安装express环境 `npm i -g express-generator`
3. `express --version` 验证express是否安装成功
4. `express 名称 -e` 创建项目
5. 运行vue打包项目，将打包出来的`index.html`和`static`放到`express`生成环境中的`public`文件夹中
6. 直接`localhost:端口号`访问就行
