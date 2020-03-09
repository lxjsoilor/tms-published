<template>
  <div class="hc-logistics-details">
    <van-nav-bar
      title="运单详细信息"
      left-arrow
      left-text="返回"
      fixed
      border
      @click-left="back()"
    />
    <div class="hc-details-box">
      <div id="hcallmap" class="hc-allmap"></div>
      <div class="hc-map-button">
        <van-button @click="handlerPay('start')" v-ripple icon="play-circle-o" plain size="small" type="primary">运行</van-button>
        <van-button @click="handlerPay('pause')" v-ripple icon="pause-circle-o" plain size="small" type="primary">暂停</van-button>
      </div>

    </div>
    <div class="hc-popup">
      <van-popup
        v-model="show"
        round
        :overlay="arrowDirection ==='arrow-down'"
        :close-on-click-overlay="false"
        position="bottom"
        :style="{ height: popupHeight }"
      >
        <div class="hc-popup-box">
          <div v-ripple class="hc-popup-tab" @click="handlerTab">
            <van-icon :name="arrowDirection" />
          </div>
          <div class="hc-tab-box">
            <div class="hc-tab-btn">
              <div @click="flagActive = true" v-ripple class="hc-tab-button" :class="{'hc-active': flagActive}">
                行驶路线
              </div>
              <div @click="flagActive = false" v-ripple class="hc-tab-button" :class="{'hc-active': !flagActive}">
                卸货详情
              </div>
            </div>
            <div class="hc-tab-content" :style="{height: arrowDirection ==='arrow-down' ? '420px' : ''}">
              <div v-show="flagActive" v-for="(itme, index) in 10" :key="index" class="hc-content-left">
                <div class="hc-item-item">
                  <div>
                    <span>到</span>
                    2020-02-17 15:51
                  </div>
                  <div>
                    <span>离</span>
                    2020-02-17 15:51
                  </div>
                </div>
                <div class="hc-item-item">泰山啤酒</div>
              </div>
              <div v-show="!flagActive" v-for="(itme, index2) in 10" :key="index2" class="hc-content-right">
                <div class="hc-right-item">
                  <div class="hc-item-title">
                    <van-icon class="hc-item-icon" name="location" color="#008b67"/>
                    虎彩工厂卸货点
                  </div>
                  <div class="hc-item-subtitle">
                    <span class="hc-subtitle-left van-ellipsis">
                      虎彩工厂卸货点
                    </span>
                    <span class="hc-subtitle-right van-ellipsis">
                      50箱子
                    </span>
                  </div>
                  <div class="hc-item-subtitle">
                    <span class="hc-subtitle-left van-ellipsis">
                      虎彩工厂卸货点虎彩工厂卸货点虎彩工厂卸货点虎彩工厂卸货点虎彩工厂卸货点
                    </span>
                    <span class="hc-subtitle-right van-ellipsis">
                      511110箱子
                    </span>
                  </div>
                  <div class="hc-item-subtitle">
                    <span class="hc-subtitle-left van-ellipsis">
                      虎彩工厂卸货点
                    </span>
                    <span class="hc-subtitle-right van-ellipsis">
                      50箱子
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { HcLoading } from 'components/hcLoading/index.js'
import 'common/js/lushu.js'
import points from 'common/js/js722.js'
import Convertor from 'common/js/bmap.js'
import uploadPointList from 'common/js/uploadPointList.json'
let currentPoints = points;
let Convertor2 = Convertor;

export default {
  data () {
    return {
      show: true,
      popupHeight: '80px',
      flagActive: true,
      lushu: null,
      map: null
    }
  },
  computed: {
    arrowDirection() {
      if(this.popupHeight === '80px') {
        return 'arrow-up'
      }else {
        return 'arrow-down'
      }
    }
  },
  methods: {
    handlerPay(type) {
      this.map.setZoom(10)
      if(type === 'start') {
        this.lushu.start();
      } else {
        this.lushu.pause();
      }
    },
    initMap () {
      var points = currentPoints.points.map(item => {
        return Convertor2.Convertor.WGS2BD09(item)
      });
      this.map = new BMap.Map('hcallmap') // 创建Map实例
      this.map.enableScrollWheelZoom()
      var arrPois = [];
      for (var i = 0; i < points.length; i++) {
        var lng = points[i].lng;
        var lat = points[i].lat;
        arrPois.push(new BMap.Point(lng, lat));
      }
      this.map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: '#008b67' }));
      this.map.setViewport(arrPois);
      this.lushu = new BMapLib.LuShu(this.map, arrPois, {
        defaultContent: "",
        autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon(require('../../assets/image/truck_icon.png'), new BMap.Size(35, 35)),
        speed: 45000,
        enableRotation: true,//是否设置marker随着道路的走向进行旋转
        landmarkPois: []
      });
      // 起点
      let startPoint = arrPois[0]
      let startIcon = new BMap.Icon(require('../../assets/image/icon-start.png'), new BMap.Size(26, 35), {
        anchor: new BMap.Size(13, 35)
      })
      this.map.addOverlay(new BMap.Marker(startPoint, {icon: startIcon}))
      // 终点
      let endPoint = arrPois[arrPois.length - 1]
      let endIcon = new BMap.Icon(require('../../assets/image/icon-end.png'), new BMap.Size(26, 35), {
        anchor: new BMap.Size(13, 35)
      })
      this.map.addOverlay(new BMap.Marker(endPoint, {icon: endIcon}))
      // 卸货点
      uploadPointList.forEach((item, index) => {
        let uploadPoint = new BMap.Point(item.lng, item.lat)
        let iconName = 'gray'
        if(item.ArriveTime && item.LeaveTime) {
          iconName = 'green'
        }else if(item.ArriveTime && !item.LeaveTime) {
          iconName = 'red'
        }
        let uploadIcon = new BMap.Icon(require(`../../assets/image/icon-${iconName}.png`), new BMap.Size(26, 45), {
          anchor: new BMap.Size(13, 45)
        })
        let marker = new BMap.Marker(uploadPoint, {icon: uploadIcon})
        let label = new BMap.Label(index + 1,{offset:new BMap.Size(0, 0)})
        label.setStyle({
          color : '#fff',
          fontSize : '14px',
          backgroundColor :'0.05',
          border :'0',
          fontWeight :'bold',
          width: '26px',
          height: '45px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        })
        this.map.addOverlay(marker)
        marker.setLabel(label)
        // 动画

      });
    },
    handlerTab () {
      if(this.popupHeight === '500px') {
        this.popupHeight = '80px'
      }else {
        this.popupHeight = '500px'
      }
    }
  },
  async mounted () {
    const result = await this.getCurrentAddress()
    this.initMap()
    HcLoading.show()
    setTimeout(() => {
      HcLoading.close()
    }, 4000)
  }
}
</script>

<style lang="scss">
.hc-logistics-details {
  position: relative;
  .hc-popup {
    padding: 0 20px;
  }
  .hc-details-box {
    padding-top: 46px;
    height: 100vh;
    position: relative;
    .hc-map-button {
      position: absolute;
      right: 10px;
      top: 50px;
      display: flex;
      flex-direction: column;
      button {
        margin-bottom: 5px;
      }
    }
    .hc-allmap {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
  .van-popup--bottom {
    transition: 0.3s all;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  }
  .hc-popup-box {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .hc-popup-tab {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #cccccc;
    width: 100%;
    z-index: 10;
    background-color: #fff;
  }
  .hc-tab-box {
    .hc-tab-btn {
      height: 45px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hc-tab-content {
      overflow-y: scroll;
      .hc-content-left {
        height: 64px;
        width: 100%;
        padding-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &::after {
          content: '';
          width: 10px;
          height: 10px;
          background-color: rgb(0, 139, 103);
          position: absolute;
          left: 10px;
          top: 0px;
          bottom: 0px;
          margin: auto;
          border-radius: 50%;
        }
        .hc-item-item {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 14px;
          span {
            color: rgb(0, 139, 103);
          }
        }
      }
      .hc-content-right {
        padding: 10px 24px 10px;
        .hc-right-item {
          .hc-item-title {
            position: relative;
            font-size: 16px;
            line-height: 24px;
            font-weight: bold;
            .hc-item-icon {
              position: absolute;
              left: -20px;
              top: 4px;
              bottom: 0px;
              margin: auto;
              font-size: 18px;
            }
          }
          .hc-item-subtitle {
            padding: 4px 0px;
            display: flex;
            justify-content: space-between;
            .hc-subtitle-left {
              color: #535353;
            }
            .hc-subtitle-right {
              color: #008b67;
              flex-shrink: 0;
            }
          }
        }
      }
    }
    .hc-tab-button {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 139, 103, 0.7);
      font-size: 16px;
      position: relative;
      transition: 1s all;
      &::after {
        content: '';
        transition: 0.2s all;
        width: 0px;
        height: 2px;
        background-color: rgb(0, 139, 103);
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
      }
      &.hc-active {
        color: rgb(0, 139, 103);
        font-weight: bold;
        &::after {
          content: '';
          width: 100px;
          height: 2px;
          background-color: rgb(0, 139, 103);
          position: absolute;
          bottom: 0px;
          left: 0px;
          right: 0px;
          margin: auto;
        }
      }
    }
  }
}
</style>
