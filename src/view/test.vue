<template>
    <div>
        <div style="margin-left: 40px">
            <button @click="start()" :v-if="rounds.length > 0 && !rounds[0].activated">
                启动游戏
            </button>
            <div v-for="(round, i) in rounds">
                <p>
                ======================={{ i + 1}}======
                </p>
                <p>
                    eth : {{ round.eth.toNumber() }}
                </p>
                <p>
                    keys : {{ round.keys.toNumber() }}
                </p>
                <p>
                    mask : {{ round.mask.toNumber() }}
                </p>
                <p>
                    winner: {{ round.winner }}
                </p>
                <p>
                    pool: {{ round.pool.dividedBy(Math.pow(10, 18)).toNumber() }}
                </p>
                <p>
                    minimumPool: {{ round.minimumPool.dividedBy(Math.pow(10, 18)).toNumber() }}
                </p>
                <p>
                    nextLucky: {{ round.nextLucky.toNumber() }}
                </p>
                <p>
                    luckyCounter: {{ round.luckyCounter.toNumber() }}
                </p>
                <p>
                    luckyPool: {{ round.luckyPool.dividedBy(Math.pow(10, 18)).toNumber() }}
                </p>
                <p>
                    endTime: {{ round.endTime.toNumber() }}
                </p>
                <p>
                    roundTime: {{ round.roundTime.dividedBy(3600).toNumber() }}
                </p>
                <p>
                    remainTime: {{ round.remainTime.dividedBy(60).toNumber() }} min
                </p>
                <p>
                    activated: {{ round.activated }}
                </p>
                <p>
                    finalized: {{ round.finalized }}
                </p>

                <p>
                    购买<input @change="calculate_cost(i)" v-model="round.buy_keys"> 个keys <br/>
                    价格 {{ round.cost }} ETH <br/>
                    <button @click="buy(i)">购买</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

const etherEnv = require('@/lib/etherEnv')
const fp3dMod = require('@/lib/fp3d_mod')
const async = require('async')

export default {
    //组件名
    name: 'test',
    //实例的数据对象
    data() {
        return {
            rounds: [],
            keys: [],
            decimals: 1000000
        }
    },
    //方法
    methods: {
        start() {
            return this.context.fp3d.start1stRound()
        },
        loadRounds() {
            this._loadRounds()
            setTimeout(() => {
                this._loadRounds()
            }, 10 * 1000)
        },
        _loadRounds() {
            this.context.fp3d.loadAllRound()
                .then(_rounds => {
                    
                    return new Promise((r, j) => {
                        async.times(
                            _rounds.length,
                            (i, callback) => {
                                this.context.fp3d.remainTime(i)
                                    .then(_t => {
                                        _rounds[i].remainTime = _t
                                        _rounds[i].buy_keys = 1
                                        _rounds[i].cost = 0
                                        callback()
                                    })
                            },
                            (err) => {
                                if(err){
                                    j(err)
                                } else {
                                    r(_rounds)
                                }
                            }
                        )
                    })
                    .then(_rounds => {
                        this.rounds = _rounds
                    })
                })
        },
        buy(i) {
            return this.calculate_cost(i)
                .then(_cost => {
                    return this.context.fp3d.buy(i + 1, _cost, 0)
                })
        },
        calculate_cost(i) {
            let buy_keys = new this.context.BigNumber(this.rounds[i].buy_keys)
            buy_keys = buy_keys.mul(this.decimals)
            return this.context.fp3d.ethForKey(buy_keys, i + 1)
                .then(_cost => {
                    this.rounds[i].cost = _cost.dividedBy(Math.pow(10, 18)).toNumber()
                    return _cost
                })
        }
    },
    mounted() {
      console.log(`test`)
      etherEnv.Init(window.web3)
          .then(cxt => {
              this.context = cxt
              return fp3dMod.getFp3d(cxt.web3)
          })
          .then(_fp3d => {
              this.context.fp3d = _fp3d
              return this.loadRounds()
          })
          .catch(err => {
              console.error(err)
          })
    }
}

</script>