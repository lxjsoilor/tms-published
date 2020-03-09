<template>
  <div class="hc-sign-for">
    <van-nav-bar title="订单签收" left-text="返回" left-arrow @click-left="back()" bind:click-right="onClickRight" fixed border />
    <div class="hc-sign-for-list">
      <van-panel title="虎彩工厂卸货点" status="已签收" icon="location" v-for="(item, index) in 10" :key="index">
        <van-cell-group>
          <van-cell title="泰山精酿啤酒蓝色极光28天450ml6瓶整箱" value="20箱" />
          <van-cell title="泰山原浆啤酒 7天鲜活720ml 6瓶整箱" value="223320箱" />
        </van-cell-group>
        <div class="hc-sign-button">
          <van-button @click="dialogShow = true" v-ripple color="#008b67" round size="small" type="primary">确认签收</van-button>
        </div>
      </van-panel>
    </div>
    <van-dialog v-model="dialogShow" @confirm="handlerSingFor" show-cancel-button confirm-button-color="#008b67">
      <template #title>
        <span class="iconfont my-icon-local"></span>
      </template>
      <div class="hc-dialog-content">
        <div class="hc-location">当前位置：德州市齐河县齐河大道1182号德百金街</div>
        <div>已到达虎彩工厂卸货点？</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogShow: false
    }
  },
  methods: {
    handlerSingFor () {
      this.HcMessageBox('签收成功！')
      setTimeout(() => {
        this.HcMessageBox.close()
        this.back()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.hc-sign-for {
  background-color: #e0e0e0;
  height: 100vh;
  padding-top: 45px;
  .hc-sign-for-list {
    overflow: scroll;
    height: 100%;
    padding: 10px 10px 0px;
    .van-cell-group {
      border-radius: 4px;
      box-shadow: 0 0 2px 1px rgba(100, 100, 100, 0.1);
      margin-bottom: 10px;
    }
    .van-panel__header {
      border-radius: 4px;
    }
    .van-panel__header-value {
      color: #008b67;
    }
  }
  .van-icon {
    color: #008b67;
  }
  .van-cell {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .van-cell__value {
    color: #ff8e4e;
  }
  .hc-sign-button {
    text-align: center;
    padding: 10px;
    button {
      padding: 0 20px;
    }
  }
  .my-icon-local {
    font-size: 38px;
    color: #008b67;
  }
  .hc-dialog-content {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    padding: 0 20px;
    .hc-location {
      color: #77CEB8;
      font-size: 12px;
      padding-bottom: 5px;
    }
  }
}
</style>
