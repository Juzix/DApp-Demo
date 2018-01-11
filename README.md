## 1 说明
---------

1. 基于Node.js提供的web3，改造属于我们公司需求的web3.

2. 由于合约部署的时候，contract的new方法是调用sendTransaction需要使用密码解锁用户，dan在IDE环境下，没有用户的密码，故以给contract增加deploy方法用于部署合约。

## 2 安装

`npm install git+ssh://http://luchenqun:fendoubuxi@192.168.9.66/Juzix-ethereum/web3.git#develop`
如果是写到package.json里面，以git协议这么写：`
'key-manager':git+ssh://http://luchenqun:fendoubuxi@192.168.9.66/Juzix-ethereum/web3.git#develop`

## 3 开发环境搭建

---------

* 项目http地址：http://192.168.9.66/Juzix-ethereum/web3
* 项目Git地址：git@192.168.9.66:Juzix-ethereum/web3.git
* 开发分支：develop
* 开发环境：Ubuntu 14.04 64位 或 Windows 10

## 4 使用指南

---------

1. 将项目clone下来：`git clone git@192.168.9.66:Juzix-ethereum/web3.git`。
2. 切到项目目录，安装依赖的包：`npm install`。
3. 安装ethereumjs-tx依赖的包：`cd node_modules/ethereumjs-tx && npm install`。主要是为了解决此错误：Error: Couldn't find preset "stage-0" relative to directory "D:\\Code\\contract-browser\\node_modules\\_web3@0.19.1@web3\\node_modules\\ethereumjs-tx" while parsing file: D:\Code\contract-browser\node_modules\_web3@0.19.1@web3\node_modules\ethereumjs-tx\index.js
4. 使用`npm run build-web3`将在dist目录下面得到一个浏览器可用的web3.js文件。

---------

# Migration 0.13.0 -> 0.14.0

web3.js version 0.14.0 supports [multiple instances of web3](https://github.com/ethereum/web3.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
-var web3 = require('web3');
+var Web3 = require('web3');
+var web3 = new Web3();
```


# Ethereum JavaScript API

[![Join the chat at https://gitter.im/ethereum/web3.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum/web3.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Ethereum compatible [JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/ethereum/ethereum.js.png)](https://ci.testling.com/ethereum/ethereum.js) -->

You need to run a local Ethereum node to use this library.

[Documentation](https://github.com/ethereum/wiki/wiki/JavaScript-API)

## Installation

### Node.js

```bash
npm install web3
```

### Meteor.js

```bash
meteor add ethereum:web3
```

### As Browser module
Bower

```bash
bower install web3
```

Component

```bash
component install ethereum/web3.js
```

* Include `web3.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `web3` object directly from global namespace:

```js
console.log(web3); // {eth: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
```

There you go, now you can use it:

```js
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
```

You can find more examples in [`example`](https://github.com/ethereum/web3.js/tree/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

[npm-image]: https://badge.fury.io/js/web3.png
[npm-url]: https://npmjs.org/package/web3
[travis-image]: https://travis-ci.org/ethereum/web3.js.svg
[travis-url]: https://travis-ci.org/ethereum/web3.js
[dep-image]: https://david-dm.org/ethereum/web3.js.svg
[dep-url]: https://david-dm.org/ethereum/web3.js
[dep-dev-image]: https://david-dm.org/ethereum/web3.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/ethereum/web3.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/ethereum/web3.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ethereum/web3.js?branch=master
[waffle-image]: https://badge.waffle.io/ethereum/web3.js.svg?label=ready&title=Ready
[waffle-url]: http://waffle.io/ethereum/web3.js
