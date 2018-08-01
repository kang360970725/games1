## api格式规范
* https，json格式，返回标准格式为
   1. code
   为0表示成功，其余为错误码
   2. data
   消息返回内容
   3. error
   错误信息

* 后台地址

  http://39.104.106.42:4356


#### 账户管理

批量管理用来生成、控制以太坊子账户。

1. 读取账户信息

   * GET /stats?address={address}&network={network}

     address为账户地址，network 1表示主网，3表示ropsten testnet。

   * data:

   ```
     {
       address: %address%,         //账户地址
       delegateCount: %count%,     //当前托管账户数量
       allowed: %allowed%          //允许的托管账户数量上线
     }
   ```

2. 生成托管地址

   * GET /gen_delegate?n={count}&network={network}&from={from}

     n为生成地址数量，network表示连接网络，from表示发起请求者账户

     最后生成的地址数量不会超过上限。
  
   * data

     该接口为异步接口，调用成功后code为0，请隔一段时间后调用stats接口查询地址创建情况

3. 获取托管地址列表

   * GET /addresses?address={address}&start={start}&end={end}&type=delegate
     
     返回地址address的托管地址列表[start, end)

   * data

     [address] 地址列表

4. 批量控制接口
   * POST /batchControl?operation={operation}&start={start}&end={end}
     
     PostBody:
     ```
     { 
        network: ,    // 网络 1 mainnet 3 ropsten
        key:,         // 用户验证用的sign结果
        timestamp:,   // 用户验证用的sign参数
        address:,     // 用户地址
        amount:,      // 操作代币数量，-1表示所有余额
        gasPrice:,    // 交易gas price
        to:,          // 交易目的地址
        token:        // 交易代币地址, 0表示操作ETH，
     }
     ```   
       operation目前包括:
         1. send
   * data
     data是一个数组，内部结构为
     ```
     [
       { error, data }   // 当error存在时，表示该子账号交易失败，否则data字段为交易id
     ]
     
#### 交易记录部分
交易记录部分主要是中心化保存用户的操作历史，提供查询功能

1. 读取账户交易历史
   * GET /transactions?address={address}&start={start}&end={end}&network={network}

     读取某一个账户发出的交易历史

   * data

2. 保存账户交易历史

   * POST /transaction?address={address}&type={type}&tx={tx}&network={network}

     存储某次交易信息，address表示发送方，type表示交易类型，tx表示交易hash

   * data
      