<template>
  <div>
    <div>
    <el-button
      size="mini"
      @click="handleAdd()">添加图书
    </el-button>
    <el-button
      size="mini"
      type="danger"
      @click="handleDelete()">删除图书
    </el-button>
    <el-button
      size="mini"
      @click="handleListAll()">查询图书
    </el-button>
    </div>
    <el-form :model="selectTable" class="divcss5">
      <el-form-item label="编号" label-width="100px">
        <el-input v-model="selectTable.number"></el-input>
      </el-form-item>
      <el-form-item label="书名" label-width="100px">
        <el-input v-model="selectTable.name"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="100px">
        <el-input v-model="selectTable.price"></el-input>
      </el-form-item>
      <el-form-item label="作者" label-width="100px">
        <el-input v-model="selectTable.author"></el-input>
      </el-form-item>
      <el-form-item label="注释" label-width="100px">
        <el-input v-model="selectTable.remark"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="书名" width="180"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="remark" label="注释"></el-table-column>
    </el-table>
    <div width="50%"></div>
      <el-dialog title="JUICE区块链账户验证" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="操作" label-width="100px">
            <el-input v-model="form.method" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="账户名" label-width="100px" >
            <el-input v-model="form.accountName" readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import {mobileAndTabletcheck, browseCheck} from '../../config/mUtils';
  import Web3 from 'web3';
  import EthereumTx from 'ethereumjs-tx';
  export default {
    data() {
      return {
        contractAddress: "0x2c3cad4cd68746bfde8e73167f067185830c59e6",
        provideAddr: "https://junode4.juzhen.io:443",
        abiArray:    [{"constant":false,"inputs":[{"name":"_moduleName","type":"string"},{"name":"_moduleVersion","type":"string"},{"name":"_contractName","type":"string"},{"name":"_contractVersion","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getErrno","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"},{"name":"_str2","type":"string"},{"name":"_str3","type":"string"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"},{"name":"_addr","type":"address"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_number","type":"string"}],"name":"deleteByNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"},{"name":"_i","type":"int256"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_moduleName","type":"string"},{"name":"_moduleVersion","type":"string"},{"name":"_newOwner","type":"address"}],"name":"changeModuleRegisterOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_moduleName","type":"string"},{"name":"_moduleVersion","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"},{"name":"_str2","type":"string"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSender","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"listAll","outputs":[{"name":"_json","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_moduleName","type":"string"},{"name":"_moduleVersion","type":"string"},{"name":"_contractName","type":"string"},{"name":"_contractVersion","type":"string"},{"name":"_newOwner","type":"address"}],"name":"changeContractRegisterOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"},{"name":"_key","type":"string"},{"name":"_value","type":"string"}],"name":"writedb","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"},{"name":"_ui","type":"uint256"}],"name":"log","outputs":[{"name":"_ret","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_number","type":"string"},{"name":"_name","type":"string"},{"name":"_price","type":"string"},{"name":"_author","type":"string"},{"name":"_remark","type":"string"}],"name":"add","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_errno","type":"uint256"},{"indexed":false,"name":"_info","type":"string"}],"name":"Notify","type":"event"}],
        selectTable: {
          number: '1',
          name: '区块链开发',
          price: '100',
          author: 'JUZIX',
          remark: 'DEMO',
        },
        form: {
          accountName: "",
          password: "",
          method: "",
        },
        dialogFormVisible: false,
        tableData: [],
      };
    },
    methods: {
      handleAdd() {
        this.form.method = '添加图书';
        if (browseCheck() && !mobileAndTabletcheck()) {
          let userInfoS = this.get('userInfo');
          if (userInfoS === 'undefined' || userInfoS === '') {
            this.$alert('请先登陆开放服务平台', '提示', {
              confirmButtonText: '确定'
            });
            return;
          }
          let userInfo = JSON.parse(userInfoS);
          let keyObject = JSON.parse(window.localStorage['keyObject-' + userInfo.userName]);
          this.form.accountName = keyObject.account;
          this.dialogFormVisible = true;
        } else {
          this.addPassword();
        }
      },
      handleDelete() {
        this.form.method = '删除图书';
        if (browseCheck() && !mobileAndTabletcheck()) {
          let userInfoS = this.get('userInfo');
          if (userInfoS === 'undefined' || userInfoS === '') {
            this.$alert('请先登陆开放服务平台', '提示', {
              confirmButtonText: '确定'
            });
            return;
          }
          let userInfo = JSON.parse(userInfoS);
          let keyObject = JSON.parse(window.localStorage['keyObject-' + userInfo.userName]);
          this.form.accountName = keyObject.account;
          this.dialogFormVisible = true;
        } else {
          this.addPassword();
        }
      },
      handleListAll() {
        this.getDataList();
      },
      async getDataList() {
        let web3 = new Web3(new Web3.providers.HttpProvider(this.provideAddr));
        let contract = web3.eth.contract(this.abiArray).at(this.contractAddress);
        const resp = contract.listAll();
        this.tableData = [];
        this.tableData = JSON.parse(resp).data;
      },
      addPassword() {
        let web3 = new Web3(new Web3.providers.HttpProvider(this.provideAddr));
        let contract = web3.eth.contract(this.abiArray).at(this.contractAddress);
        if ('添加图书' == this.form.method) {
          const myCallData = contract.add.getData(this.selectTable.number, this.selectTable.name, this.selectTable.price, this.selectTable.author, this.selectTable.remark);
          this.mySendTransaction(web3, myCallData);
        } else if ('删除图书' == this.form.method) {
          const myCallData = contract.deleteByNumber.getData(this.selectTable.number);
          this.mySendTransaction(web3, myCallData);
        }
        this.dialogFormVisible = false;
      },
      mySendTransaction(web3, myCallData) {
        let nonce;
        if (mobileAndTabletcheck()) {
          nonce = web3.nonce().toString('hex');
        } else {
          nonce = web3.nonce();
        }
        let rawTx = {
          nonce: nonce,       // 获取交易nonce值
          gasPrice: 100000000000,//21000000000
          gasLimit: 10000000000000,//843314949521407
          to: this.contractAddress, // 合约address
          data: myCallData // 发送的交易数据
        };
        if (browseCheck() && !mobileAndTabletcheck()) {
          // 同步
          let userInfo = JSON.parse(this.get('userInfo'));
          let keyObject = JSON.parse(window.localStorage['keyObject-' + userInfo.userName]);
          let privateKey = keyManager.recover(keyObject.username, keyObject.account, this.form.password);
          let tx = new EthereumTx(rawTx);
          let privateKeyBuffer = new Buffer(privateKey, 'hex');
          tx.sign(privateKeyBuffer);
          let serializedTx = tx.serialize().toString('hex');
          web3.eth.sendRawTransaction(serializedTx,  (err, hash) => {
            console.log(err)
            if (!err){
              console.log(hash);
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定'
              });
              setTimeout(10000);
              this.getDataList();
            }
          });
        } else {
          // 调用客户端能力进行交易签名
          Juice.wallet.sign(rawTx, (res) => {
            let signData = res.data;
            web3.eth.sendRawTransaction(signData, (err, hash) => {
              if (!err){
                console.log(hash);
                this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定'
                });
                setTimeout(10000);
                this.getDataList();
              }
            });
          });
        }
      },
      get (c_name) {
        if (document.cookie.length > 0) {
          let c_start = document.cookie.indexOf(c_name + "=")
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return document.cookie.substring(c_start, c_end)
          }
        }
        return ""
      },
    }
  };
</script>
