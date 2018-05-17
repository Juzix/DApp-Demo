## 应用描述

该应用为一款基于JUICE开放服务平台开发的图书管理DApp应用，通过应用界面可以对图书进行增删查功能操作


## 项目运行（nodejs 6.0+）

## 安装依赖
```
npm install
```
## 本地调试（http://localhost:30001/bookMgr）
```shell
npm run dev
```

## 发布
```shell
npm run build
```
打包后的demo下目录static和文件index.html，放到服务器上，直接访问静态文件index.html

> 开放服务平台线上打包修改两个地方
```
DApp-Demo\config\index.js assetsPublicPath: '/bookMgr' 
\DApp-Demo\index.html <script src="/bookMgr/static/js/key-manager-min.js"></script>
```