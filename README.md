# 图书管理
> 本项目使用nodejs通过web3j对合约进行操作，来管理图书的增删查操作。

* 样例（contract目录）
1. BookManager.sol：图书的业务逻辑，增删查。
2. BookModule.sol：图书模块，图书模块的URL可以跳转到DApp应用(开发者自己编写)。

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
打包后的demo下目录static和文件index.html，放到服务器上，直接访问静态文件index.html。

## URL访问
contract目录下的BookModule.sol中
```
moduleUrl = "https://www.juzhen.io/bookMgr";
```
设置的URL为服务访问URL（DApp应用的URL）。

## 合约部署
BookManager.sol和BookModule.sol合约文件需要部署，DApp才能使用。
请看合约开发章节，部署样例合约。
