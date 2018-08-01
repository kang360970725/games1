# 94eth js lib库

该库目的是为了方便dapp开发者使用js与内嵌的web3进行交互。

* etherEnv.js 

  环境库，用来检测metamask是否安装以及用户信息等。
  使用方法，以vue为例：

    1. Init(web3) return Promise
     返回一个context实例，内容包括:

       * web3   web3对象
       * address  当前登录的用户地址
       * network  当前连接的网络id

       ```
        const env = require('@/lib/etherEnv')

        mounted() {
            env.Init(window.web3)  //使用内嵌web3初始化
            .then(cxt => {
                this.context = cxt   //保存context
                ...
              })
            .catch(err => {
            // error 处理
            })
          }
          ```

     只有Init之后，才能继续调用该package的其它方法, **Init后，也可以通过env.STATE**获取到该context实例

  2. getEthBalance return Promise(BigNumber)
      返回当前账户的ETH余额

  3. txOnEtherscan(txid) return string
      返回指定交易在etherscan上的链接

  4. contractOnEtherscan(address) return string
      返回指定合约在etherscan上的链接

  5. getBalanceOf return Promise(BigNumber)
      返回某一个账户的eth余额
* abi.js
  abi库，常用库的abi json
  1. erc20    erc20 标准abi
  2. eos       eos 的abi
  3. stock    股份token的abi
  4. airdrop 空投合约的abi
  5. activity 直投合约的abi
  6. actGenerator 直投合约生成器合约的abi

* deployed.js
  已经部署的合约的地址
  示例
  ```
  const deployed = require('@/lib/deployed')
  const holderAddr = deployed.holder['3']   //testnet上的股权合约

* airdrop.js
  空投合约js封装，使用该类时，请首先初始化空投合约的contract对象，示例:

   ```
   let web3, etherenv // 请自行初始化web3, etherenv
   const Contract = require('./contract')
   const abi = require('./abi')
   const AirDrop = require('./airdrop)

   etherenv.Init(web3)
     .then(cxt => {
          const addr = require('./deployed').airdrop[cxt.network]
          const c = new Contract(web3.eth.contract(abi.airdrop).at(addr))
          return new AirDrop(c)
      })
      .then(airdrop => {
            ...
       })
   ```
  #### aridrop对象方法
  1. dropToken([]address, amount, tokenAddr) return Promise(txid)
      
      给出token地址，需要空投的地址列表和每个地址空投的token数量。
      会发出空投，返回空投交易哈希。

  2. dropEth([]address, amount) returns Promise(txid)
      
      给出需要空投的地址列表和每个地址空投token数量
      发出空投，返回空投交易哈希

  3. dropTokenS([]address, []amount, tokenAddr) return Promise(txid)
      
      提供每个地址都空投不同数量token的调用
 
  4. dropEthS([]address, []amount) return Promsie(txid)

      提供每个地址空投不同ETH的调用
       
* batchControl.js
  batchControl主要用以账户批量管理模块的名额购买.
  请先用etherEnv里的STATE初始化一个batchControl对象

  ```
  const BatchControl = require('./batchControl')
  let etherEnv // Init环境...

  const batchControl = new BatchControl(etherEnv.STATE)
  ```
  #### batchControl 对象方法
  1. price() returns Promise(string)
  返回当前每账户名额的价格（字符串表示，以eth为单位）

   2. buy(n) returns Promise(txhash)
   购买n个账户，返回购买交易哈希

# 附录
1. error code对照表

  | code | error name | 备注 |
  | ------ | -------------   | ------- |
  |    0   |  成功          |           |
  |    1   |  WEB3_MISS | web3对象缺失，一般是前端没装metamask |
 | 2 | NETWORK_UNCONNECTED | 节点没有连接上 |
 | 3 | UNKNOWN_ACCOUNT | |
 | 4 | ACCOUNT_LOCKED | 未获取到ACCOUNT，一般是metamask没解锁账户 | 
 | 5 | INVALID_ADDRESS | 地址非法 | 
 | 6 | RPC_ERROR | 与节点RPC通信出错 | 
 | 7 | NOT_ERC20 | 合约并非erc20标准token |
 | 8 | RANGE_INVALID | 起止范围错误 | 
 | 9 | MISS_PARAMETER | 请求参数缺失 |
 | 10 | UNSUPPORTED_NETWORK | 不支持的ETH网络 |
 | 11 | USER_AUTH_FAIL | 用户验证失败 |
 | 12 | TUTORIAL_NOT_BOUGHT | 教程未购买 |
 | 13 | TUTORIAL_NOT_READY | 教程尚未上线 |
 | 14 | ACCOUNTS_REACH_LIMIT | 账户数量已满 |