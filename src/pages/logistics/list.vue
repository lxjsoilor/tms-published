<template>
  <div class="hc-logistics-list">
    <van-nav-bar title="物流查询" @click-left="sheetShow = !sheetShow"  @click-right="jump('logisticsSearch')" fixed>
      <van-icon name="search" slot="right" color="#B3B3B3" size="20px" />
      <van-icon name="bars" slot="left" color="#B3B3B3" size="20px" style="font-size:12px"></van-icon>
    </van-nav-bar>
    <div class="hc-list-box">
      <!-- <div class="">某某公司</div> -->
      <van-tabs sticky animated offset-top="45" @click="handlerClick" :active="activeTabs" color="#008B67" title-active-color="#008B67" line-width="150">
        <van-tab title="未签收">
          <div class="nodataimg" v-if="!resultSheet==undefined||resultSheet.length<=0">
            <img src="../../assets/nodata.svg" alt />
            <div>暂无数据</div>
          </div>
          <div v-if="resultSheet">
            <div class="containter" v-for="(item,index) in resultSheet" :key="index">
              <div class="cell">
                <div class="celltop van-hairline--bottom">
                  <van-row type="flex" justify="space-between">
                    <van-col span="13">
                      <div class="number">
                        <van-icon class-prefix="my-icon" class="iconfont" slot="right-icon" name="list" color="#008B67" /> 运单号:{{item.SheetNo}}
                      </div>
                    </van-col>
                    <van-col span="4">
                      <div class="text">{{item.CodeName}}</div>
                      <div class="text"> {{item.StatusName}}</div>
                    </van-col>
                    <van-col span="4" v-if="item.Sugstatus">
                      <div class="textbug" @click="toBugDetail(item)">订单异常</div>
                    </van-col>
                  </van-row>
                </div>
                <div class="cellcenter">
                  <div>
                    <van-row>
                      <van-col span="24">
                        <div class="cellinfo van-ellipsis">
                          <van-row>
                            <van-col span="5">
                              <span class="gary">承运车辆：</span>
                            </van-col>
                            <van-col span="5">
                              <span class="lineTxt">{{item.VehicleNumber}}</span>
                            </van-col>
                            <van-col offset="4" span="5">
                              <span class="weightQty">
                                {{item.Weight}}吨
                                <span style="color:#E4E4E4">|</span>
                                {{item.Qty}}箱
                              </span>
                            </van-col>
                          </van-row>
                        </div>
                        <div class="cellinfo">
                          <span class="gary">运单时间：</span>
                          <span>{{item.CreateTime}}</span>
                        </div>
                        <div class="cellinfo">
                          <van-row>
                            <van-col span="5">
                              <span class="gary">运单线路：</span>
                            </van-col>
                            <van-col span="19">
                              <span class="lineTxt">{{item.LineTxt}}</span>
                            </van-col>
                          </van-row>
                        </div>
                        <div class="cellinfo">
                          <span v-if="item.StatusName == '已派车'" class="gary">预计累计里程：</span>
                          <span v-if="item.StatusName == '已打印' || item.StatusName == '运输中' || item.StatusName == '已签收'" class="gary">实际累计里程：</span>
                          <span v-if="item.StatusName == '已派车'">{{item.PlanOdometer || '未有实时数据'}}{{item.PlanOdometer ? 'km' : ''}}</span>
                          <span v-if="item.StatusName == '已打印' || item.StatusName == '运输中' || item.StatusName == '已签收'">{{item.Odometer || '未有实时数据'}}{{item.Odometer ? 'km' : ''}}</span>
                        </div>
                      </van-col>
                    </van-row>
                    <div class="cellinfo item-button">
                      <van-row type="flex" justify="center">
                        <van-col span="10">
                          <button v-ripple class="signbutton yellow" @click="jump('logisticsSubmission')">异常提报</button>
                        </van-col>
                        <van-col span="10">
                          <button v-ripple class="signbutton green" @click="jump('logisticsSignFor')">到达&签收</button>
                        </van-col>
                        <van-col span="10">
                          <button v-ripple class="signbutton green" @click="jump('logisticsDetails')">详细信息</button>
                        </van-col>
                      </van-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已签收">
          <div class="nodataimg" v-if="!resultSheet==undefined||resultSheet.length<=0">
            <img src="../../assets/nodata.svg" alt />
            <div>暂无数据</div>
          </div>
          <div v-if="resultSheet">
            <div class="containter" v-for="(item,index) in resultSheet" :key="index">
              <div class="cell">
                <div class="celltop van-hairline--bottom">
                  <van-row type="flex" justify="space-between">
                    <van-col span="13">
                      <div class="number">
                        <van-icon class-prefix="my-icon" class="iconfont" slot="right-icon" name="list" color="#008B67" /> 运单号:{{item.SheetNo}}
                      </div>
                    </van-col>
                    <van-col span="4">
                      <div class="text">{{item.CodeName}}</div>
                      <div class="text"> {{item.StatusName}}</div>
                    </van-col>
                    <van-col span="4" v-if="item.Sugstatus">
                      <div class="textbug" @click="toBugDetail(item)">订单异常</div>
                    </van-col>
                  </van-row>
                </div>
                <div class="cellcenter">
                  <div>
                    <van-row>
                      <van-col span="24">
                        <div class="cellinfo van-ellipsis">
                          <van-row>
                            <van-col span="5">
                              <span class="gary">承运车辆：</span>
                            </van-col>
                            <van-col span="5">
                              <span class="lineTxt">{{item.VehicleNumber}}</span>
                            </van-col>
                            <van-col offset="4" span="5">
                              <span class="weightQty">
                                {{item.Weight}}吨
                                <span style="color:#E4E4E4">|</span>
                                {{item.Qty}}箱
                              </span>
                            </van-col>
                          </van-row>
                        </div>
                        <div class="cellinfo">
                          <span class="gary">运单时间：</span>
                          <span>{{item.CreateTime}}</span>
                        </div>
                        <div class="cellinfo">
                          <van-row>
                            <van-col span="5">
                              <span class="gary">运单线路：</span>
                            </van-col>
                            <van-col span="19">
                              <span class="lineTxt">{{item.LineTxt}}</span>
                            </van-col>
                          </van-row>
                        </div>
                        <div class="cellinfo">
                          <span v-if="item.StatusName == '已派车'" class="gary">预计累计里程：</span>
                          <span v-if="item.StatusName == '已打印' || item.StatusName == '运输中' || item.StatusName == '已签收'" class="gary">实际累计里程：</span>
                          <span v-if="item.StatusName == '已派车'">{{item.PlanOdometer || '未有实时数据'}}{{item.PlanOdometer ? 'km' : ''}}</span>
                          <span v-if="item.StatusName == '已打印' || item.StatusName == '运输中' || item.StatusName == '已签收'">{{item.Odometer || '未有实时数据'}}{{item.Odometer ? 'km' : ''}}</span>
                        </div>
                      </van-col>
                    </van-row>
                    <div class="cellinfo item-button">
                      <van-row type="flex" justify="center">
                        <van-col span="10">
                          <button v-ripple class="signbutton yellow" @click="jump('logisticsSubmission')">异常提报</button>
                        </van-col>
                        <van-col span="10">
                          <button v-ripple class="signbutton green" @click="jump('logisticsSignFor')">到达&签收</button>
                        </van-col>
                        <van-col span="10">
                          <button v-ripple class="signbutton green" @click="jump('logisticsDetails')">详细信息</button>
                        </van-col>
                      </van-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-action-sheet cancel-text="取消" v-model="sheetShow" :actions="sheetActions" @select="onSelect" />
  </div>
</template>
<script>
import { } from 'api/ajax.js'
export default {
  data () {
    return {
      sheetShow: false,
      activeTabs: 0,
      resultSheet: [{}, {}, {}],
      sheetActions: [
        { name: '退出' },
        { name: '操作说明' }
      ]
    }
  },
  methods: {
    handlerClick () {

    },
    onSelect (item) {
      if (item.name === '退出') {
        this.logout()
      } else {
        this.jump('illustrate')
      }
    },
    logout () {
      this.sheetShow = false
      this.HcMessageBox.alert('是否退出当前账号？', {
        iconType: 'err'
      }).then(() => {
        this.PcCookie.delete({
          key: this.gbs.USER.PHONE
        })
        this.jump('login')
      })
    }
  }
}
</script>
<style lang="scss">
.hc-logistics-list {
  .hc-list-box {
    height: 100%;
    overflow-y: scroll;
    padding-top: 45px;
    .van-tabs__nav--line {
      height: auto;
    }
  }
  .username_container {
    padding: px2rem(15);
    font-size: px2rem(14);
  }
  .nodataimg {
    height: px2rem(600);
    img {
      width: px2rem(80);
      height: px2rem(55);
    }
    text-align: center;
    color: #b3b3b3;
    font-size: px2rem(14);
    height: px2rem(55);
  }
  .signbutton {
    border-radius: 24px;
    border: 1px solid #e2e2e2;
    width: px2rem(100);
    height: px2rem(37);
    background-color: #ffffff;
    font-size: px2rem(12);
  }

  .detailbutton {
    border: 1px solid #e2e2e2;
    border-radius: 24px;
    width: px2rem(180);
    height: px2rem(37);
    background-color: #ffffff;
    font-size: px2rem(15);
  }
  .weightQty {
    font-size: px2rem(14);
    color: #008b67;
  }
  .van-nav-bar {
    z-index: 9999 !important;
  }
  .gary {
    color: #999;
  }
  .green {
    color: #008b67;
  }
  .yellow {
    color: #ff5d00;
  }
  .cellinfo {
    margin-bottom: px2rem(15);
    .item-button {
      display: flex;
      justify-content: space-around;
    }
    .van-row--justify-center {
      text-align: center;
    }
  }
  .nodataimg {
    text-align: center;
    padding-top: px2rem(106);
    position: absolute;
    top: 50px;
    left: 0px;
    width: 100%;
    background-color: #fff;
    img {
      vertical-align: middle;
    }
    div {
      font-size: px2rem(14);
      color: #b3b3b3;
    }
  }

  .containter {
    background-color: #e2e2e2;
    font-size: px2rem(14);
    padding-top: px2rem(10);
    .cell {
      padding-top: 0;
      background: #fff;
      .celltop {
        line-height: px2rem(27);
        margin-left: px2rem(15);
        margin-right: px2rem(15);
        padding-bottom: px2rem(10);
        padding-top: px2rem(14);
        padding-right: 0;
        padding-left: 0;
        .number {
          font-size: px2rem(14);
        }
        .text {
          //    margin-right:px2rem(1);
          font-size: px2rem(12);
          color: #008b67;
        }
        .textbug {
          padding-left: 10px;
          margin-right: 10px;
          width: px2rem(60);
          height: px2rem(27);
          font-size: px2rem(12);
          background: #ff5d00;
          color: #ffffff;
          border-radius: px2rem(14);
        }
      }
      .cellcenter {
        padding-top: 10px;
        margin-right: px2rem(15);
        margin-left: px2rem(15);
        font-size: px2rem(12);
      }
    }
  }
}
</style>
