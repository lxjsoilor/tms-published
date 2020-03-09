<template>
  <div class="hc-search">
    <van-nav-bar v-show="searchShow" @click-left="back()" @click-right="jump('logisticsList')" fixed border title="物流查询" left-text="返回" left-arrow>
      <van-icon name="home-o" slot="right" />
    </van-nav-bar>
    <van-nav-bar v-show="!searchShow" @click-left="searchShow = true" @click-right="searchShow = true" fixed border title="物流查询" left-text="返回" left-arrow>
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <div v-show="searchShow" class="hc-search-cell">
      <van-cell-group>
        <van-cell @click="showTimePicker = true" :title="searchDate.length > 0 ? `${searchDate[0]}至${searchDate[1]}` : '请选择日期范围'" >
          <van-icon
            slot="right-icon"
            name="clock-o"
            style="line-height: inherit;"
          />
        </van-cell>
        <van-button v-ripple @click="handlerSearch" color="#008b67" round type="default">查 询</van-button>
      </van-cell-group>
    </div>
    <div v-show="!searchShow" class="hc-search-result">
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
    <van-calendar :default-date="rangeDate" @confirm="onConfirm" v-model="showTimePicker" :min-date="new Date(2018, 0, 1)" :max-date="new Date()" type="range" color="#008b67" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showTimePicker: false,
      rangeDate: [],
      searchDate: [],
      resultSheet: [{}, {}, {}, {}, {}],
      searchShow: true
    }
  },
  methods: {
    onConfirm ([startDate, endDate]) {
      this.searchDate = [this.moment(startDate).format('YYYY-MM-DD'), this.moment(endDate).format('YYYY-MM-DD')]
      this.showTimePicker = false
    },
    handlerSearch () {
      if (this.searchDate.length > 0) {
        this.searchShow = false
      } else {
        this.$toast('请选择要搜索的日期范围')
      }
    }
  },
  mounted () {
    this.rangeDate = [new Date(this.moment().subtract(1, 'days').format('YYYY/MM/DD')), new Date()]
  }
}
</script>

<style lang="scss">
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.hc-search {
  padding-top: 45px;
  .hc-search-cell {
    height: 100vh;
    background-color: #fff;
    padding: 0 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    .van-cell-group {
      width: 300px;
      padding-bottom: 180px;
      text-align: center;
      border: none !important;
      &::after {
        border: none;
      }
      .van-cell {
        border: 1px solid #d4d4d4;
        text-align: left;
        .van-icon {
          font-size: 20px;
        }
      }
      .van-button {
        margin-top: 20px;
        padding: 0 30px;
      }
    }
  }
  .hc-search-result {
    height: 100%;
    overflow-y: scroll;
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
  }

}
</style>
