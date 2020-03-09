<template>
  <div class="hc-illustrate">
    <div class="hc-bar">
      <van-nav-bar
        title="操作说明"
        left-text="返回"
        left-arrow
        @click-left="jump('logisticsList')"
      />
    </div>
    <div class="hc-content">
      <div class="hc-h">运输管理系统用户操作手册</div>
      <div class="hc-p1">
        1. 注册与登陆使用说明
      </div>
      <div class="hc-p2">
        1.1 注册用户
      </div>
      <div class="hc-p3">1) 关注公众号 </div>
      <div class="hc-img">
        <img src="./images/1.jpg" alt="">
      </div>
      <div class="hc-p3">2) 进入公众号 </div>
      <div class="hc-img">
        <img src="./images/2.jpg" alt="">
      </div>
      <div class="hc-img">
        <img src="./images/3.jpg" alt="">
      </div>
      <div class="hc-p3">3) 进入注册页面->输入手机号->获取验证码->输入验证码->下一步 </div>
      <div class="hc-img">
        <img src="./images/4.jpg" alt="">
      </div>
      <div class="hc-p3">4) 同意协议->提交注册->注册完成 </div>
      <div class="hc-img">
        <img src="./images/6.jpg" alt="">
      </div>
      <div class="hc-p2">1.2 登陆公众号</div>
      <div class="hc-img">
        <img src="./images/7.jpg" alt="">
      </div>
      <div class="hc-p3">1) 进入公众号登陆 </div>
      <div class="hc-img">
        <img src="./images/6.jpg" alt="">
      </div>
      <div class="hc-p3">2) 进入登陆页面  </div>
      <div class="hc-img">
        <img src="./images/7.jpg" alt="">
      </div>
      <div class="hc-p3">3) 输入手机号码->获取验证码->输入验证码->登陆 </div>
      <div class="hc-img">
        <img src="./images/9.jpg" alt="">
      </div>
      <div class="hc-p1">2. 经销商/卸货点物流查询</div>
      <div class="hc-p3">经销商跟卸货点用户登陆泰啤物流公众号，能查看运输单相应的物流运输情况以及运单的详细信息。</div>
      <div class="hc-p2">2.1登陆首页使用说明</div>
      <div class="hc-p3">1) 登陆账号</div>
      <div class="hc-p3">2) 进入物流查询页面，可以看到有两个页签：未签收，已签收。</div>
      <div class="hc-img">
        <img src="./images/10.jpg" alt="">
      </div>
      <div class="hc-p3">3) 点击“详细信息”->进入详细信息查看对应运单的运输轨迹。</div>
      <div class="hc-img">
        <img src="./images/11.jpg" alt="">
      </div>
      <div class="hc-img">
        <img src="./images/12.jpg" alt="">
      </div>
      <div class="hc-p3">4) 查看运单跟踪情况 </div>
      <div class="hc-img">
        <img src="./images/13-1.jpg" alt="">
      </div>
      <div class="hc-img">
        <img src="./images/13-2.jpg" alt="">
      </div>
      <div class="hc-p3">5) 查看运输单对应的产品详情 </div>
      <div class="hc-img">
        <img src="./images/14.jpg" alt="">
      </div>
      <div class="hc-p2">2.2 查询功能使用说明 </div>
      <div class="hc-p3">1) 进入查询页面</div>
      <div class="hc-img">
        <img src="./images/15.jpg" alt="">
      </div>
      <div class="hc-p3">2) 输入运单时间查询运单 </div>
      <div class="hc-img">
        <img src="./images/16.jpg" alt="">
      </div>
      <div class="hc-p3">3) 输入运单时间以及运单状态查询 </div>
      <div class="hc-img">
        <img src="./images/17.jpg" alt="">
      </div>
      <div class="hc-p3">4) 查询结果页面 </div>
      <div class="hc-img">
        <img src="./images/18.jpg" alt="">
      </div>
      <div class="hc-p3">5) 返回主页 </div>
      <div class="hc-img">
        <img src="./images/19.jpg" alt="">
      </div>
      <div class="hc-p2">2.3 订单异常查看</div>
      <div class="hc-p3">1) 在首页点击订单异常按钮进入订单异常查看页面</div>
      <div class="hc-img">
        <img src="./images/20.jpg" alt="">
      </div>
      <div class="hc-p3">2) 进入异常页面查看 </div>
      <div class="hc-img">
        <img src="./images/21.jpg" alt="">
      </div>
      <div class="hc-p2">2.4 订单评论 </div>
      <div class="hc-p3">1) 订单签收后的半个钟内可以评论 </div>
      <div class="hc-img">
        <img src="./images/22.jpg" alt="">
      </div>
      <div class="hc-p1">3. 退出登陆</div>
      <div class="hc-p3">1) 退出登陆 </div>
      <div class="hc-img">
        <img src="./images/23.jpg" alt="">
      </div>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.hc-illustrate {
  color: #333;
  font-size: 14px;
  .hc-bar {
    position: fixed;
    top: 0px;
    width: 100%;
    .van-icon-arrow-left {
      color: #008b67 !important;
    }
    .van-nav-bar__text {
      color: #008b67 !important;
    }
  }
  .hc-content {
    padding: px2rem(15);
    height: 100%;
    overflow-y: scroll;
    .hc-img {
      img {
        width: 100%;
      }
    }
    .hc-h {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      line-height: 34px;
    }
    .hc-p1 {
      font-size: 16px;
      font-weight: bold;
      line-height: 32px;
    }
    .hc-p2 {
      line-height: 30px;
      font-size: 14px;
      font-weight: bold;
    }
    .hc-p3 {
      font-weight: bold;
      font-size: 12px;
      line-height: 30px;
    }
  }
}
</style>
