<template>
    <section>
        <b-navbar toggleable="md" type="dark" variant="dark" class="jumboshade">
            <div class="container">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand class="navbar-brand" href="#">CHANCE3D</b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav class="ml-auto">
                        <ul class="header-list clearfix">
                            <li class="nav-link-purp-on nav-link-purp">第 {{ this.stat.currentRound }} 轮</li>
                            <li class="nav-link-purp-on nav-link-purp">已售出 {{ this.stat.round_keys }} 个egg</li>
                            <li class="nav-link-purp-on nav-link-purp">本轮拥有egg数量 {{ this.stat.player_keys }}</li>
                        </ul>
                    </b-navbar-nav>
                    <b-nav-item-dropdown text="关于CHANCE-EGG" right class="nav-link nav-link-purp">
                        <b-dropdown-item href="javacript:void(0);"  v-b-modal="'operationModal'">游戏规则</b-dropdown-item>
                        <b-dropdown-item target="_blank" :href="this.contract_url">查看合约</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-collapse>
            </div>
        </b-navbar>
        <div class="blurryboy"> </div>
        <div class="jumbotron rounded-0 text-center text-light teaser-cover l-second-floor">
            <div class="container">
                <br/>
                <br/>
                <!-- <h4 class="display-4 scammed" style="font-style: italic;">当前奖池</h4> -->
                <h3 class="display-1 scammed no-mobile">
                    <a target="_blank" :href="this.stat.winner_link">{{ this.stat.winner? this.stat.winner.substr(0, 18):this.stat.winner }}...</a>
                </h3>
                <h3 class="display-1 scammed no-mobile">
                    的
                    <!-- <i class="iconfont icon-caidan l-icon-caidan2"></i> -->
                    <object :data="eggsSrc" width="70" height="110" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/imstall/"  style="position: relative;top: 14px;"/>
                    就要孵化啦！
                </h3>
                <h2 class="display-3">
                    <span class="ethglitch titleglow l-info">
                        {{ this.stat.pool.toFixed(8) }}
                        <eth-icon :svg-class="'l-svg-eth ethglow'"></eth-icon>
                    </span>
                    <span class="headtimer">
                        {{ this.timer }}
                        <br/>
                    </span>
                </h2>
                <button :disabled="disabled" @click="buyOneKey" class="buyOneTicket btn btn-lg btn-block btn-purp pulse marginb">
                    <div class="row">
                        <div class="col-sm-1.5 no-mobile" style="padding-left: 10px"> 1x
                            <!-- <i class="iconfont icon-caidan l-icon-caidan"></i> -->
                            <object :data="eggsSrc" width="25" height="25" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/imstall/" style="margin: 0 0 -5px -5px;"/>
                        </div>
                        <div class="col-sm-11">
                            <span style="margin-right: 0rem;margin-left: -1rem" class="only-mobile mobile-text">1x
                                <!-- <i class="iconfont icon-caidan l-icon-caidan"></i> -->
                                <object :data="eggsSrc" width="25" height="25" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/imstall/" style="margin: 0 0 -5px -5px;"/>
                                <!-- <key-icon :svg-class="'l-svg-key1'"></key-icon> -->
                            </span>{{slogan}}
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <!-- 移动端 start -->
        <div class="only-mobile container">
            <b-row>
                <b-col cols="1" sm="1"></b-col>
                <b-col cols="10" sm="10" align-self="center">
                    <b-input-group size="lg" :append="'@ '+this.buy_cost+' ETH'" class="key-input1">
                        <b-form-input v-model="buy_keys" @change="cal_buy"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col cols="1" sm="1"></b-col>
            </b-row>
            <b-row class="send-box">
                <b-col cols="1" sm="1"></b-col>
                <b-col cols="10" sm="10" align-self="center">
                    <button type="button" @click="buy" class="btn btn-block btn-purp btn-lg ticketProcess">
                        <eth-icon :svg-class="'l-svg-eth1'"></eth-icon>
                        砸蛋
                    </button>
                </b-col>
                <b-col cols="1" sm="1"></b-col>
            </b-row>
        </div>
        <!-- 移动端 end -->
        <!-- pc start -->
        <div class="container ">
            <div class="row">
                <div class="col-sm">
                    <b-tabs nav-class="tabs-border-adjust">
                        <b-tab title="购买egg" active title-item-class="tab-item  no-mobile" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <b-input-group size="lg" :append="'@ '+this.buy_cost+' ETH'">
                                    <b-form-input v-model="buy_keys" @change="cal_buy"></b-form-input>
                                </b-input-group>
                                <div class="row marginb l-add-keys">
                                    <div class="col">
                                        <div class="btn-group d-flex" role="group">
                                            <button v-for="(item, index) in addKeyList" :key="index" class="btn btn-outline-yel increment" :class="item.class" @click="addKeys(item.value)">{{item.label}}</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="position: relative;">
                                    <div class="col">
                                        <button type="button" id="tixBuy" @click="buy" class="btn btn-block btn-purp btn-lg ticketProcess">
                                            <eth-icon :svg-class="'l-svg-eth1'"></eth-icon>
                                            砸蛋！
                                        </button>
                                    </div>
                                    <div class="col">
                                        <button type="button" id="tixReinvest" @click="reload" class="btn btn-block btn-outline-purp btn-lg ticketProcess">
                                            <piggy-icon class="l-svg-piggy"></piggy-icon>

                                            用盈利复购</button>
                                    </div>
                                </div>
                            </div>

                        </b-tab>
                        <b-tab title="推广返利" title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div v-if="stat.id !== -1">
                                        <p>
                                            你的推广链接是
                                        </p>
                                        <a target="_blank" :href="stat.ref_url">{{ this.stat.ref_url }}</a>
                                    </div>

                                    <div v-if="stat.id === -1">
                                        <p class="text-center">
                                            购买egg后也会自动生成推广链接，一个账户固定一个链接
                                        </p>
                                        <b-button size="lg" class="btn btn-outline-purp btn-block buyceo" @click="register">
                                            生成推广链接
                                        </b-button>
                                    </div>
                                </div>

                            </div>

                        </b-tab>
                        <b-tab title="我的收益" title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">彩蛋孵化</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.stat.win.toFixed(8) }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">分红</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.stat.wallet.toFixed(8) }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">推广奖励</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.stat.affiliate.toFixed(8) }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <b-button size="lg" class="btn-purp btn-block btn-lg ticketProcess" @click="withdrawal">
                                        一键提现 {{ this.stat.profit.toFixed(8) }}
                                        <eth-icon :svg-class="'l-svg-ethbtn'"></eth-icon>
                                    </b-button>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
                <div class="col-sm">
                    <b-tabs nav-class="tabs-border-adjust">
                        <b-tab title="当前奖池" active title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <tab-header :title="'第' + this.stat.currentRound + '轮'" :id="'currentRound'"></tab-header>
                                <div class="row nomarginb margin-top">
                                    <div class="col">
                                        <p class="h2 text-center">彩蛋即将孵化<br>
                                            <span class="glow boxtimer"> {{ this.timer }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="row marginb">
                                    <div class="col">
                                        <div class="progress">
                                            <div class="progress-bar boxglow" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">当前奖池</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch"> {{ this.stat.pool.toFixed(8) }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <!--
                                    <div class="row marginb">
                                        <div class="col text-right">≙ 10,346,295.01640 USDT</div>
                                    </div>
                                    -->
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">拥有彩蛋</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right"> {{ this.stat.player_keys.toFixed(8) }}
                                                <!-- <i class="iconfont icon-caidan l-icon-caidan1"></i> -->
                                                <object :data="eggsSrc" width="25" height="25" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/imstall/" />
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row marginb">
                                        <div class="col text-right">一共 {{ this.stat.round_keys.toFixed(8) }}
                                            <!-- <i class="iconfont icon-caidan"></i> -->
                                            <object :data="eggsSrc" width="25" height="25" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/imstall/" />
                                        </div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">当前收入</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right"> {{ this.stat.profit.toFixed(8) }}
                                                <eth-icon :svg-class="'l-tag-svg'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <!--
                                    <div class="row marginb">
                                        <div class="col text-right"> ≙ USDT </div>
                                    </div>
                                    -->
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="排行榜" title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <tab-header title="赢家排行" :id="'player'"></tab-header>
                                <div class="row" style="position: relative;">
                                    <div class="col">
                                        <div class="jumbotron jumbotron-adjust teamscore">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" class="borderchange">轮次</th>
                                                        <th scope="col" class="borderchange text-center">赢家</th>
                                                        <th scope="col" class="borderchange tright">获胜奖池</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(data,index) in winners" :key="index">
                                                        <th scope="row" class="playername truncate"> {{ data.round }}</th>
                                                        <td class="text-center">{{ data.winner.substr(0, 15) + '...' }}</td>
                                                        <td class="tright">{{ data.amount.toFixed(8) }} ETH</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <!--
                        <b-tab title="数据统计" title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <tab-header :title="'Stats for Round #1 (Current)'"></tab-header>

                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">Total Invested:</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">95,595.334
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row marginb">
                                        <div class="col text-right">≙ 45,227,108.32 USDT</div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">Distributed Rewards:</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">74,004.316
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row marginb">
                                        <div class="col text-right">≙35,012,181.89 USDT </div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">Time Purchased</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">32.82 Years</p>
                                        </div>
                                    </div>
                                    <div class="row marginb">
                                        <div class="col text-right"> 1,035,107,330 Seconds</div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        -->
                        <!-- <b-tab title="奖池" title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">当前奖金池</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.pool }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>

                                            </p>
                                        </div>
                                    </div>
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">每个egg分红量</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.watermark }}
                                                <eth-icon :svg-class="'l-tag-svg ethglow'"></eth-icon>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab> -->
                        <!-- <b-tab title="统计" active title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">
                                <div class="jumbotron jumbotron-adjust teamscore">
                                    <div class="row nomarginb">
                                        <div class="col-auto">
                                            <p class="h4">本轮已经售出</p>
                                        </div>
                                        <div class="col">
                                            <p class="h2 text-right glow ethglitch">
                                                {{ this.keyTh - 1}} egg
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </b-tab> -->
                        <!--
                        <b-tab title="egg交易" active title-item-class="tab-item" title-link-class="tab-link">
                            <div class="jumbotron jumbotron-adjust text-light bg-dark jumboshade tab-rounded">

                                <p>
                                    当前拥有egg {{ this.stat.owned }} 个
                                </p>
                                <div>
                                    <p>出售egg</p>

                                </div>
                                <div>
                                    <p>最低卖单</p>
                                </div>
                            </div>
                        </b-tab>
                        -->
                    </b-tabs>
                </div>
            </div>
        </div>
        <!-- pc end -->

        <b-modal ref="myModal" hide-footer>
            <div class="d-block text-center">
                <h3>请在metamask中完成交易</h3>
            </div>
        </b-modal>

        <b-modal id="currentRound" centered hide-footer title="游戏规则" body-class="game-rule-body" header-class="game-rule-header">
            <ul>
                <li>
                    每轮游戏结束时，最后一个参与的玩家成为孵化幸运蛋的人，获得该轮奖池的
                    <b class="popoverglow">{{ this.params.wa }}%</b>。
                </li>
                <li>
                    所有该轮的参与者，根据持有该轮egg的数量瓜分奖池的
                    <b class="popoverglow">{{ this.params.we }}%</b>。
                </li>
                <li>
                    游戏结束时，任意玩家可以通过购买egg，或者揭标来发起清算并开始下一轮游戏，同时获得该轮奖池的
                    <b class="popoverglow">{{ this.params.wc }}%</b>。
                </li>
                <li>
                    每轮奖池的
                    <b class="popoverglow">{{ this.params.wb }}%</b>会进入下一轮奖池
                </li>
            </ul>
            <br/>
            <ul>
                <li>
                    玩家可以注册获得推广链接，其它玩家通过该链接参与游戏时，推广人会获得对应的奖励。
                </li>
                <li>
                    每个玩家购买egg时，
                    <b class="popoverglow">{{ this.params.ta }}%</b>会进入奖池，
                    <b class="popoverglow">{{ this.params.tb }}%</b>分给该轮的egg持有人。
                </li>
                <li>
                    <b class="popoverglow">{{ this.params.tc }}%</b>会分给上级推荐人，
                    <b class="popoverglow">{{ this.params.td }}%</b>分给上上级推荐人。
                </li>
                <li>
                    每轮游戏开始时默认最长持续时间
                    <b class="popoverglow"> {{ this.params.maxTimeRemain.toFixed(3) }}小时 </b>, 每当用户购买egg时，该轮剩余持续时间如果没超过最长持续时间，则剩余持续时间增加
                    <b class="popoverglow">{{ this.params.timeGap }}秒</b>。
                </li>
            </ul>
        </b-modal>
        <b-modal id="player" centered hide-footer title="游戏规则" body-class="game-rule-body" header-class="game-rule-header">
            <ul>
                <li>
                    每轮游戏结束时，最后一个参与的玩家成为孵化幸运蛋的人，获得该轮奖池的
                    <b class="popoverglow">{{ this.params.wa }}%</b>。
                </li>
                <li>
                    所有该轮的参与者，根据持有该轮egg的数量瓜分奖池的
                    <b class="popoverglow">{{ this.params.we }}%</b>。
                </li>
                <li>
                    游戏结束时，任意玩家可以通过购买egg，或者揭标来发起清算并开始下一轮游戏，同时获得该轮奖池的
                    <b class="popoverglow">{{ this.params.wc }}%</b>。
                </li>
                <li>
                    每轮奖池的
                    <b class="popoverglow">{{ this.params.wb }}%</b>会进入下一轮奖池
                </li>
            </ul>
            <br/>
            <ul>
                <li>
                    玩家可以注册获得推广链接，其它玩家通过该链接参与游戏时，推广人会获得对应的奖励。
                </li>
                <li>
                    每个玩家购买egg时，
                    <b class="popoverglow">{{ this.params.ta }}%</b>会进入奖池，
                    <b class="popoverglow">{{ this.params.tb }}%</b>分给该轮的egg持有人。
                </li>
                <li>
                    <b class="popoverglow">{{ this.params.tc }}%</b>会分给上级推荐人，
                    <b class="popoverglow">{{ this.params.td }}%</b>分给上上级推荐人。
                </li>
                <li>
                    每轮游戏开始时默认最长持续时间
                    <b class="popoverglow"> {{ this.params.maxTimeRemain.toFixed(3) }}小时 </b>, 每当用户购买egg时，该轮剩余持续时间如果没超过最长持续时间，则剩余持续时间增加
                    <b class="popoverglow">{{ this.params.timeGap }}秒</b>。
                </li>
            </ul>
        </b-modal>

        <BlockUI v-if="loadingFlag" :message="loadingMsg" :html="html">
        </BlockUI>
        <operation-modal :params="params"></operation-modal>
    </section>

</template>

<script>
// import bg from '@/assets/purple_bg.jpg'
const ethEnv = require('@/lib/etherEnv');
const utils = require('@/lib/utils');
// const deployed = require('@/lib/deployed')
// const errors = require('@/lib/errors')
const fp3d = require('@/lib/fp3d2');
const api = require('@/api/backend');
const {getCurrentUrl, getUrlParms} = require('@/lib/tools');

import ethIcon from '@/components/icon/eth-icon';
import keyIcon from '@/components/icon/key-icon';
import piggyIcon from '@/components/icon/piggy-icon';
import tabHeader from '@/components/tab-header/index.vue';
import operationModal from '@/components/modal/operation-modal.vue';

export default {
    //组件名
    name: 'fp3d',
    data() {
        return {
            html: '<i class="iconfont icon-caidan l-icon-loading"></i>',
            loadingFlag: true,
            show: true,
            timer: '00:00:00',
            diff: -1,
            soldKeys: 0,
            buy_keys: 1,
            buy_cost: 0,
            ref_url: null,
            win_gain: 0,
            referer: 0,
            stat: {
                currentRound: 1,
                owner: null,
                dicimals: 1000000,
                round_eth: 0,
                round_keys: 0,
                mask: 0,
                winner: null,
                winner_link: null,
                pool: 0,
                id: -1,
                player_eth: 0,
                player_keys: 0,
                profit: 0,
                win: 0,
                wallet: 0,
                affiliate: 0,
            },
            params: {
                ta: 0,
                tb: 0,
                tc: 0,
                td: 0,
                te: 0,
                wa: 0,
                wb: 0,
                wc: 0,
                wd: 0,
                we: 0,
                maxTimeRemain: 0,
            },
            slogan: '看个蛋，赶紧买个蛋',
            addKeyList: [
                {
                    value: 1,
                    label: '+ 1 egg',
                    class: 'w-100',
                },
                {
                    value: 2,
                    label: '+ 2 eggs',
                    class: 'w-40',
                },
                {
                    value: 5,
                    label: '+ 5',
                    class: 'w-30',
                },
                {
                    value: 10,
                    label: '+ 10',
                    class: 'w-30',
                },
                {
                    value: 100,
                    label: '+ 100',
                    class: 'w-30',
                },
            ],
            winners: [],
            disabled: false,
            loadingMsg: '加载中...',
            contract_url: null
        };
    },
    computed:{
        eggsSrc:function(){
        //    return process.env.NODE_ENV === 'production'?'./images/egg2.svg':'../../../static/images/egg2.svg'
        return 'http://dnf.sdcslog.com/img/egg2.svg'
                   }
    },
    methods: {
        diffToTime() {
            if (this.diff < 0) {
                this.timer = `--:--:--`;
                this.slogan = `正在读取数据，请耐心等待...`;
                this.disabled = true;
            } else if (this.diff === 0) {
                this.disabled = false;
                this.timer = `00:00:00`;
                this.slogan = '我来揭标,领取0.5%分红!!';
            } else {
                this.disabled = false;
                const seconds = ('' + this.diff % 60).padStart(2, '0');
                const minutes = ('' + Math.floor(this.diff / 60) % 60).padStart(
                    2,
                    '0',
                );
                const hours = ('' + Math.floor(this.diff / 3600)).padStart(
                    2,
                    '0',
                );
                this.timer = `${hours}:${minutes}:${seconds}`;
                // this.slogan = '争夺奖金！！！';
            }
        },
        loopSlogan() {
            const slogans = [
                '看个蛋，赶紧买个蛋',
                '你能孵出凤凰吗',
                '我艹！上一轮孵出来个鲲',
                '知情人说 这可能是最后一个买蛋的人',
                '追逐你的梦想',
                '让这样一个人把蛋孵出来，你能忍?!',
                '小小的点击，大大的梦想',
                '最怕的，并非你不是最后一个，而是，分红都没有你',
                '这个蛋，已经有了大动静',
                '继续，点我',
                '这是把蛋孵大的唯一方式',
                '继续点击，我们会一直让大家为你生气',
                '这里真正的赢家可能是以太矿工',
                '打它还是退出它',
                '你为什么不领先？',
                '嘿，孩子，买个蛋赢我，我们可以一起玩',
                '该死的,有人一直在买钥匙，我们就可以阻止他们了吗？',
                '再一次强迫你爬到顶端',
                '来吧，买个蛋，所有的酷孩子都这么做',
                '有蛋吗？',
                '按下去，除非你试过，否则你永远不会知道',
                '你应该点击这个，它发光，它给你买蛋，它让你退出骗局，每个你认识和爱的人',
                '时间越长，锅越高，时间越长，就越干净',
                '你不是领先的',
                '告诉他们离开你的草坪',
                '是时候表现真正的技术了',
                '我曾经做过梦，现在你也可以了',
                '给你一次小小的点击，为你的钱包平衡一次巨大的飞跃',
                '再买一个蛋',
                '嘿，你得花钱赚钱，对吧？',
                '如果计时器到0就晚了，买一个蛋吧！',
                '15分钟可能会损失你15%的股息',
                '你知道你不想再买，你可以停下来',
                '你应该让他们留着',
                '从技术上讲，这只是一个以太水龙头',
                '猜想，以为，断定',
                '人是合乎逻辑的，理性的，利他的。反正骗他们',
                '来一筐蛋，我能赢！',
                '你努力合群的样子，看起来好孤独',
                '命不能改，但运可以造！',
                '当别人真正弯下腰的那一刻，',
                '会发现自己才是真正的弱者！',
                '你在熊市的选择，决定了你未来的收益。',
                '你在逆境所展现的品格和意志力，决定了未来能否真正一帆风顺。',
                '这是一个勇敢者的游戏！',
                '眼前有了繁花，并不等于你手中有了鲜蜜。',
                '想要变优秀，最大的敌人是自己的满足感。',
                '想要变优秀，最大的敌人是自己的满足。',
                '最痛苦的事，不是失败，是我本可以。',
                '你想输得过瘾还是无聊的去赢钱！耐心等待最佳时机！',
                '输赢赔赚常常折磨我们一生！',
                '当我们觉得自己赢了的时候也许却输了更多！',
                '当我们以为已经输得惨重时或许在不经意间赢得了未来！',
                '人最怕的就是自我感觉良好！',
                '因为认知，所以知道自己的渺小，因为渺小，所以才会愤怒。',
                '最好的稳定其实就是不稳定！',
                '对任何新鲜事物永远保持好奇！',
                '永远都要去尝试新东西！',
                '与平常人交，共富贵易，共患难难！',
                '在最在乎的人和事面前，我们最没有价值，越在乎，越卑微。',
                '愿你一生努力，一生被爱，想要的都拥有，得不到的都释怀！',
                '愿你明朗坦荡纵情豁达，有得有失有坚持，能哭能笑能尽欢！',
                '从轻易相信到凡事质疑，里面包含着理性之光。',
                '从凡事不信到再次愿意相信，背后是见识和格局。',
                '从每个蛋开始，走向喂食，谁还买了一个蛋',
                '我们不确定谁领先，但不是你。',
                '今天开始你的新添加++',
                '按下去，除非你试过，否则你永远不会知道！',
                '一个蛋来统治他们所有的人！',
                '点我，然后抚摸我，直到我能得到我的满足感！',
                '这个蛋甚至可以打开你的豪宅的门！',
                '这是你的，一次点击，做！',
                '臭屌丝、烂韭菜们不配买蛋！',
                '如果你赢了，会有关于你的文章。',
                '有什么可能出错？',
                '你在战斗中倒下了，买一个蛋，再试一次。',
                '如果他们无法抗拒，你就无法抗拒再买一个。',
                '这是你的，点击一下，就行了。',
                '没有秘密(除了按钮)！',
                '又是你？',
                '他们可能和你有不同的政治观点，阻止他们。',
                '你不会让一个没有名字的人赢吧？',
                '你应该让他们留着。',
                '如果你再买一个蛋，你就会有一个偶数的蛋。',
                '你知道你不想再买，你可以停下来。',
                '时间就是金钱，字面上是。',
                '看看有多少人在玩，把它乘以30秒，再买一个蛋浪费那么多时间。',
                '这个蛋是一个蛋，你知道你想要的。',
                '你最好和善的人和睦相处。',
                '这可能是一条出路。',
                '梭哈,了解一下?',
                '摆脱工资奴役是你力所能及的事，只要打败他们，你就能做到。',
                '按这个快速升级。',
                '如果你再买一个蛋，你会看到更多的蛋。',
                '这个按钮把所有的ETH都带到了院子里。',
                '他们连虚荣心的名字都付不起，你要让他们赢吗？',
                '我们确定这会结束吗？买个蛋，鼓励疯狂！',
                '有人要发财了，最好是你！',
                '我们都会成功的，别让他们赢了，再买一个蛋！',
                '我们到了吗？不。延长旅行时间。',
                '伙计，在这件事结束后，会有人真的很有钱的。',
                '这一轮真慢，不如再买一个蛋。',
                '你知道自己想要它。',
                '按此来延迟每个人的胜利！',
                '别按这个，让它结束吧！',
                '让紫色成为你最喜欢的颜色。',
                '看看他们，认为他们可以匿名赢得这场比赛，阻止他们',
                '哇，看啊，太阳神。',
                '去吧，让你的一天。',
                '继续点击，我们会继续为大家撒尿。',
                '有蛋吗？',
                '跟着他们正在消费的ETH，追踪他们有多大的钱包',
                '这里真正的教训是贪婪>友谊',
                '仍然比实际的彩票便宜',
                '一天一个蛋，当苹果不工作时，你就可以去看医生',
                '我们保证如果你买了这个蛋你会得到一个蛋',
                '新的生活离我们只有一个蛋',
                '如果你买一个，你可以独立，经济独立很快！',
                '1键=1次祈祷',
                '退出欺骗你的朋友，拿蛋，带头',
                '她就在那儿，离我只有一个蛋',
                '这个蛋打开了你不该打开的东西，拿着',
                '你好像没有更好的办法来折磨他们',
                '只要A过去就可以了!',
                '别忘了，你永远在这里。',
                '按下这个按钮，稍后再接收以太。',
                '做你该做的，停止Vip 128288',
                '我希望你没有打算卖掉这些你不能停止购买的蛋。',
                '你和vip 128288在一起吗？',
                '非常重要的人128288。',
                '如果你按下这个按钮，你实际上是在干掉vip 128288',
                '哈哈，看Vip 128288。',
                '嘿，你得花钱赚钱，对吧？',
                '你为什么不在上面？',
                '按这个来推迟每个人的胜利。',
                '在中国到来之前。',
                '这个蛋是一个蛋，你知道你想要的。',
                '每一个蛋都是30秒的恐惧和恐惧。',
                '暗示你以后不会去FOMO。',
                'Ta分析说你的关键是看涨。',
                '有的花在娱乐上，有的花在廉价酒上，其余的则愚蠢地浪费了。',
                '这一轮真慢，不如再买一个蛋。',
                '如果你再买一个蛋，你会有一些奇数的蛋。',
                '这个蛋打开了你不该打开的东西，拿着。',
                '买一个蛋浪费一周的算力',
                '这个蛋甚至可以打开你的豪宅的门',
                '老夫买蛋就是一把梭，拿收益！',
                '成为每个人身边的刺。',
                '不像彩票，你真的有机会赢。',
                '买个蛋，然后扔了。',
                '与他们战斗，争取你合法的以太王位，用一个蛋带头。',
                '你为什么要买些平静的？',
                '如果平静的随机。',
                '这个键上写着“不要复制”，违反规则。',
                '老铁，你不希望当CEO迎娶白富美？',
                '首席执行官，执行落地吧！',
                '时间到了，你也会。',
                '你最后一个蛋掉了，是时候买一把新的了！',
                '这可能是一条出路。',
                '你承诺了，你最好再买一个！',
                '你错过了多少次超越 笑来 的机会！',
                '二宝其实真的不比你强多少。',
                '据说V神认为蛋是最好的落地。',
                '他们告诉我 中本聪也买了一筐蛋！',
                '有消息说 伟星买了3000个蛋！',
                '蛋都不买，难怪你还是屌丝。',
                '这是你能搭上的最后一班车。',
            ];
            setInterval(() => {
                if (this.diff > 0) {
                    this.slogan =
                        slogans[Math.floor(Math.random() * slogans.length)];
                }
            }, 4000);
        },
        buyOneKey() {
            this.$refs.myModal.show();
            if (this.diff === 0) {
                return this.context.fp3d
                    .finalize(this.referer)
                    .then(tx => {
                        this.$refs.myModal.hide();
                    })
                    .catch(err => {
                        this.$refs.myModal.hide();
                    });
            } else {
                this.buy_keys = 1;
                this.cal_buy();
                return this.context.fp3d
                    .buy(
                        new this.context.web3.BigNumber(this.buy_cost),
                        this.referer,
                    )
                    .then(tx => {
                        this.$refs.myModal.hide();
                    })
                    .catch(err => {
                        this.$refs.myModal.hide();
                    });
            }
        },
        fp3dStat(address) {
            // 重新获取round，keyTh，bonus，wallet等信息
            return this.context.fp3d.stat(address).then(_stat => {
                this.stat = Object.assign(this.stat, _stat);
                this.stat.ref_url = `${getCurrentUrl()}?r=${this.stat.id}`;
                this.stat.winner_link = ethEnv.contractOnEtherscan(
                    this.stat.winner,
                );
            });
        },
        cal_buy() {
            let keys = this.buy_keys;
            if (keys <= 0) {
                this.$alert(`购买数量错误`);
            } else {
                /*
                let sum = new this.context.web3.BigNumber(0);
                for (let i = 0; i < this.buy_keys; i++) {
                    sum = sum.add(this.context.fp3d.price(i + this.stat.round_keys + 1));
                }
                this.buy_cost = sum.toNumber();*/
                // 更换计算方法
                let round_keys = this.stat.round_keys;
                let c_key = Math.ceil(round_keys);
                let price = this._p(c_key);
                let remain = c_key - round_keys;
                if (remain >= keys) {
                    this.buy_cost = price * keys;
                    return;
                }

                let buy_cost = price * remain;
                keys = keys - remain;

                while (keys > 1) {
                    c_key = c_key + 1;
                    price = this._p(c_key);
                    buy_cost = buy_cost + price;
                    keys = keys - 1;
                }
                c_key = c_key + 1;
                price = this._p(c_key);
                buy_cost = buy_cost + price * keys;
                this.buy_cost = buy_cost.toFixed(10);
            }
        },
        _p(n) {
            return this.context.fp3d.params.a
                .mul(n)
                .add(this.context.fp3d.params.b)
                .dividedBy(Math.pow(10, 18))
                .toNumber();
        },
        buy() {
            this.$refs.myModal.show();
            this.cal_buy();
            let cost = new this.context.web3.BigNumber(this.buy_cost);
            return this.context.fp3d
                .buy(cost, this.referer)
                .then(tx => {
                    this.$refs.myModal.hide();
                })
                .catch(err => {
                    this.$refs.myModal.hide();
                });
        },
        reload() {
            let cost =
                this.buy_cost < this.stat.profit
                    ? this.buy_cost
                    : this.stat.profit;
            cost = new this.context.web3.BigNumber(cost);
            cost = cost.mul(Math.pow(10, 18)).sub(1000);
            this.$refs.myModal.show();
            return this.context.fp3d
                .reloadKeys(cost, this.referer)
                .then(tx => {
                    this.$refs.myModal.hide();
                })
                .catch(err => {
                    this.$refs.myModal.hide();
                });
        },
        withdrawal() {
            this.$refs.myModal.show();
            return this.context.fp3d
                .withdrawal(this.referer)
                .then(tx => {
                    this.$refs.myModal.hide();
                })
                .catch(err => {
                    this.$refs.myModal.hide();
                });
        },
        register() {
            this.$refs.myModal.show();
            return this.context.fp3d
                .register(this.referer)
                .then(tx => {
                    this.$refs.myModal.hide();
                })
                .catch(err => {
                    this.$refs.myModal.hide();
                });
        },
        addKeys(val) {
            this.buy_keys = parseFloat(this.buy_keys);
            this.buy_keys += parseFloat(val);
            this.cal_buy();
        },
    },
    created() {
        ethEnv
            .Init(window.web3)
            .then(cxt => {
                this.context = cxt;

                api.fp3dTimestamp().then(_timestamp => {
                    this.diff = _timestamp;
                    this.diffToTime();
                });

                setInterval(() => {
                    api.fp3dTimestamp().then(_timestamp => {
                        console.log(`load time ${_timestamp}`);
                        this.diff = _timestamp;
                        this.diffToTime();
                    });
                }, 20 * 1000);

                setInterval(() => {
                    if (this.diff > 0) {
                        this.diff = this.diff - 1;
                        this.diffToTime();
                    }
                }, 1000);
                return fp3d.getFp3d(this.context.web3);
            })
            .then(_fp3d => {
                this.context.fp3d = _fp3d;
                this.contract_url = ethEnv.contractOnEtherscan(this.context.fp3d.c.instance.address)
                let r = getUrlParms('r');
                r && (this.referer = Number(r));

                ['ta', 'tb', 'tc', 'td', 'wa', 'wb', 'wc', 'we'].forEach(
                    prop => {
                        this.params[prop] =
                            this.context.fp3d.params[prop].toNumber() / 10;
                    },
                );
                this.params.maxTimeRemain =
                    this.context.fp3d.params.maxTimeRemain.toNumber() / 3600;
                this.params.timeGap = this.context.fp3d.params.timeGap.toNumber();
                return this.fp3dStat(this.context.address);
            })
            .then(() => {
                this.loopSlogan();
                setInterval(() => {
                    this.fp3dStat(this.context.address);
                }, 10 * 1000);
            })
            .then(() => {
                this.cal_buy();
            })
            .then(() => {
                api.winnerData().then(_data => {
                    this.winners = _data;
                    console.log(_data);
                });
                setInterval(() => {
                    api.winnerData().then(_data => {
                        this.winners = _data;
                        console.log(_data);
                    });
                }, this.context.fp3d.params.maxTimeRemain.toNumber() * 1000);
            })
            .then(() => {
                this.loadingFlag = false;
            })
            .catch(err => {
                this.loadingFlag = false;
                this.$alert(utils.zh(err));
                console.log(err);
            });
    },
    components: {
        ethIcon,
        keyIcon,
        piggyIcon,
        tabHeader,
        operationModal,
    },
};
</script>

<style lang="less" scoped>
.navbar-brand {
    font-size: 2.2rem;
    font-weight: bold;
}
.header-list {
    > li {
        padding: 0 15px;
        float: right;
        color: #f8f9fa;
        font-family: Poppins;
    }
    margin: 0 30px;
    line-height: 66px;
    font-size: 12px;


}

//覆盖样式
.l-second-floor {
    margin-bottom: 0;
    padding-bottom: 1rem;
}
svg.l-tag-svg {
    margin: -7px 0 0 0;
    width: 18px;
}

.main {
    margin: 100px 0 0;
}
.l-info {
    display: flex;
    justify-content: center;
    > svg {
        margin: 4px 0 0 0;
        width: 1em;
        height: 1em;
    }
}

.l-key-icon {
    width: 20px;
}

.l-key-info {
    padding: 10px 0 50px;
    text-align: right;
}

.l-icon-caidan {
    font-size: 20px;
}
.l-icon-caidan1 {
    margin: 0 -6px 0 0;
    font-size: 28px;
}
.l-icon-caidan2 {
    font-size: 6rem;
}
.l-svg-piggy {
    margin: -5px 0 0;
    width: 23px;
}

.l-add-keys {
    margin-top: 16px; //覆盖样式
}

.headtimer {
    margin-top: 20px;
    margin-bottom: 30px;
}

.display-3 {
    margin-top: 30px;
}

button.buyOneTicket {
    margin-top: 20px;
    &:hover {
        .l-icon-caidan {
            &::before {
                content: '\e606';
            }
        }
    }
    cursor: url('./images/zajindan.png'), auto !important;
}

// .svg-inline--fa {
//     margin-left: 15px;
// }

// web less start
.send-box {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.key-input1 {
    .input-group-text {
        font-size: 14px;
    }
}
// web less end

//弹窗样式
.game-rule-model {
    color: #212529;
    background: #ccc;
}
.popover-container {
    background: #ccc;
    border-radius: 5px;
    width: 330px;
    text-align: left;
    .popover-header {
        line-height: 32px;
        color: #000;

        background: #f7f7f7;
    }
    .popover-body {
        color: #212529;
        background: #ccc;
        border-radius: 5px;
    }
}
</style>

<style lang="less">
.dropdown-item:focus{
    background:#ff00ff;
}
.dropdown-item:hover{
    background:#ff00ff;
}
.tooltip-inner {
    max-width: 330px;
}
.loading-container {
    .loading {
        text-shadow: 0 0 2px #2b002b, 0 0 5px #c0c, 0 0 2px #f0f;
        color: white;
        background: rgba(240, 0, 240, 0.8) !important;
    }

    .l-icon-loading {
        font-size: 3rem;
    }
    .loading-label {
        font-size: 1.5rem;
    }
}

//弹窗样式
.game-rule-header {
    color: #000;
    padding: 5px 16px;
    background: #f7f7f7;
}

.game-rule-body {
    background: #ccc;
    border-radius: 5px;
}
</style>




