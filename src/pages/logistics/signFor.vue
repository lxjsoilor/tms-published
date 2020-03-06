<template>
  <div class="hc-sign-for">
    <van-nav-bar title="订单签收" left-arrow bind:click-left="onClickLeft" bind:click-right="onClickRight" fixed border />
    <div class="hc-sign-for-list">
      <van-panel title="标题" icon="location" v-for="(item, index) in 10" :key="index">
        <van-cell-group>
          <van-cell title="单元格单元格单元格单元格单元格单元格单元格" value="内容" />
          <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <div class="hc-sign-button">
          <van-button v-ripple color="#008b67" round size="small" type="primary">确认签收</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {

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
}
</style>
