#### web3.js

* **引入方式**

方式1：npm模块安装

> npm install git+ssh://[https://github.com/Juzix/web3js.git\#master](https://github.com/Juzix/web3.js.git#master)

方式2：JS脚本文件引入(在dist目录中下载js压缩文件)

> &lt;script src="web3.js"&gt;&lt;/script&gt;


* **创建web3实例**

```
var Web3 = require("web3");

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:6789"));
}
```

注意：如果采用JS脚本文件引入方式，可以忽略require这一步

* **相关API**

**1、web3.eth.contract**

描述：根据合约ABI和地址，创建Solidity合约对象

api：web3.eth.contract(abiArray)

| 参数名称 | 类型 | 必填 | 参数含义 |
| :------- | :---- | :--- | :---- |
| abiArray | Array | 是 | 合约ABI |

调用示例：
```
// 根据ABI信息加载合约对象
var MyContract = web3.eth.contract(abiArray);

// 根据合约地址创建合约实例
var contractInstance = MyContract.at([address]);
```

**2、调用合约对象的方法**

描述：合约对象内封装了使用合约的相关方法，通过传入方法参数，和交易对象调用合约方法

| 参数名称 | 类型 | 必填 | 参数含义 |
| :---------------- | :------------ | :--- | :--------------------------------------- |
| param1 | String/Number | 是 | 合约方法参数列表 |
| transactionObject | Object | 否 | 最后一个参数（如果传了callback，则是倒数第二个参数），可以是一个交易对象 |
| defaultBlock | String/Number | 否 | 如果不设置此值使用`web3.eth.defaultBlock`设定的块，否则使用指定的块 |
| callback | Function | 否 | 回调函数，用于支持异步的方式执行 |

返回结果：

| 结果字段 | 类型 | 字段含义 |
| :----- | :----- | :--------------------------------------- |
| String | String | 如果发起的是一个call查询请求，对应的是返回结果<br>如果是交易请求，返回要么是创建的合约地址，或者是一笔交易的哈希值 |

调用示例：

```JavaScript
// 显式指定调用call(读)方法
var myCallData = contractInstance.myMethod.call(param1 [, param2, ...]);

// 显示指定调用sendTransaction(写)方法
contractInstance.myMethod.sendTransaction(param1 [, param2, ...] [, transactionObject] [, callback]);

// 根据合约方法类型自动确定call或sendTransaction的使用
contractInstance.myMethod(param1 [, param2, ...] [, transactionObject] [, defaultBlock] [, callback]);
```
**3、contract.myMethod.getData(param1 [, param2, ...])**

描述：根据合约对象，获取相关合约方法的交易数据，格式说明见： http://me.tryblockchain.org/Solidity-call-callcode-delegatecall.html

api：contract.myMethod.getData(param1, [, param2, ...])

| 参数名称 | 类型 | 必填 | 参数含义 |
| :----- | :----- | :--- | :------ |
| param1 | Object | 是 | 方法参数1 |
| param2 | Object | 是 | 方法参数2 |
| ... | Object | 是 | 方法参数... |

返回结果：

| 结果字段 | 类型 | 字段含义 |
| :----- | :----- | :--------- |
| String | String | 自定义方法的交易数据 |

调用示例：

```JavaScript
// 调用自定义方法，获取自定义方法的交易数据
var data = contractInstance.myMethod.getData(param1 [, param2, ...]);
```

**4、web3.eth.call**

描述：在节点的VM中，直接执行消息调用交易，该交易不会将数据合并到区块链中，也就是我们熟称的call查询请求，可以理解为调用合约的“读”方法

api：web3.eth.call(callObject , [defaultBlock] , [callback])

| 参数名称 | 类型 | 必填 | 参数含义 |
| :----------- | :------------ | :--- | :--------------------------------------- |
| callObject | Object | 是 | 交易请求对象 |
| defaultBlock | Number/String | 否 | 默认区块号|
| callback | Function | 否 | 回调函数，用于支持异步的方式执行|

返回结果：

| 结果字段 | 类型 | 字段含义 |
| :----- | :----- | :-------- |
| String | String | 函数调用返回的值 |

调用示例：

```JavaScript
// 创建web3实例，省略
// 查询请求发起address
var from = web3.eth.accounts[0];
// 合约address
var to = "0xa4b813d788218df688d167102e5daff9b524a8bc";
// 合约方法的交易数据
var data = "0x771602f700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002";
var result = web3.eth.call({
    from: from,
    to: to,
    data: data
});

//返回结果32字节长度的结果
console.log(result);
```

**5、web3.eth.sendRawTransaction**

描述：发送签名交易，该交易会将数据合并区块链中，也就是我们熟称的签名交易请求

api：web3.eth.sendRawTransaction(signedTransactionData, [callback\])

请求参数：

| 参数名称 | 类型 | 必填 | 参数含义 |
| :-------------------- | :------- | :--- | :--------------------------------------- |
| signedTransactionData | Object | 是 | 交易请求对象 |
| callback | Function | 否 | 回调函数，用于支持异步的方式执行 |

返回结果：

| 结果字段 | 类型 | 字段含义 |
| :----- | :----- | :--------------------------------------- |
| String | String | 32字节的16进制格式的交易哈希串<br>如果交易是一个合约创建，请使用`web3.eth.getTransactionReceipt()`在交易完成后获取合约的地址 |

调用示例：

```JavaScript
var rawTx = {
    nonce: web3.nonce(),
    gasPrice: 100000000000, // 根据实际交易设置gasPrice值
    gasLimit: 10000000000000, // 根据实际交易设置gasLimit值
    to: '0x0000000000000000000000000000000000000000', // 合约address
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057' // 自定义方法的交易数据
}
// 调用客户端能力进行交易签名
Juice.wallet.sign(rawTx, (res) => {
    var signData = res.data;
    web3.eth.sendRawTransaction(signData, function (err, hash) {
        if (!err){
            console.log(hash); // 返回交易hash
        }
    });
});
```

**6、web3.eth.getTransactionReceipt**

描述：通过交易哈希值，返回交易的收据

api：web3.eth.getTransactionReceipt(hashString, [callback\])

| 参数名称 | 类型 | 必填 | 参数含义 |
| :--------- | :------- | :--- | :---------------- |
| hashString | Object | 是 | 交易哈希 |
| callback | Function | 否 | 回调函数，用于支持异步的方式执行 |

返回结果：

| 结果字段 | 类型 | 字段含义 |
| :---------------- | :----- | :--------------------------------------- |
| blockHash | String | 32字节，这个交易所在区块的哈希 |
| blockNumber | Number | 交易所在区块的块号 |
| transactionHash | String | 32字节，交易的哈希值 |
| transactionIndex | Number | 交易在区块里面的序号，整数 |
| from | String | 20字节，交易发送者的地址 |
| to | String | 20字节，交易接收者的地址<br>如果是一个合约创建的交易，返回`null` |
| cumulativeGasUsed | Number | 当前交易执行后累计花费的`gas`总值 |
| gasUsed | Number | 执行当前这个交易单独花费的`gas` |
| contractAddress | String | 20字节，创建的合约地址<br>如果是一个合约创建交易，返回合约地址，其它情况返回`null` |
| logs | Array | 这个交易产生的日志对象数组 |

调用示例：

```JavaScript
var receipt = web3.eth.getTransactionReceipt('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b');
console.log(receipt);
```


