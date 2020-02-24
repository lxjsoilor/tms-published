<template>
  <div class="hc-login">
    <div class="hc-login-box">
      <input placeholder="请输入手机号" v-model="Phone" maxlength="11" type="text" />
      <button :class="smsCodeBtn !== '获取验证码' ? 'hc-sms-disabled' : ''" @click="handlerGetSmsCode">
        <div class="hc-sms-code-text" v-ripple>{{smsCodeBtn}}</div>
      </button>
    </div>
    <div class="hc-login-box">
      <input v-model="SmsCode" placeholder="请输入验证码" maxlength="6" type="text" />
    </div>
    <div class="hc-login-btn">
      <van-button v-ripple type="primary" size="large" @click="Login">登录</van-button>
      <van-button v-ripple type="default" size="large" @click="jump('register')">注册</van-button>
    </div>
  </div>
</template>

<script>
import {
  GetToken,
  GetMsgTemplateByCode,
  SendMsg,
  Login,
  getWxOpenid
} from 'api/ajax.js'
import { HcMessageBox } from 'components/hcMessage/index.js'
export default {
  data () {
    return {
      Phone: '',
      SmsCode: '',
      regMessageTpl: '',
      smsCodeBtn: '获取验证码'
    }
  },
  methods: {
    handlerGetSmsCode () {
      if (this.smsCodeBtn !== '获取验证码') return
      if (this.validate(this.Phone, 'phone')) {
        this.GetMsgTemplateByCode(this.$enums.SMS.LOGIN_CODE)
      } else {
        this.$toast('手机号码格式不正确')
      }
    },
    // 获取短信模板
    async GetMsgTemplateByCode (MsgCode) {
      const result = await GetMsgTemplateByCode({
        MsgCode
      })
      if (result.Success) {
        this.regMessageTpl = result.Data[0].Message
        let random = this.createSmsCode(100000, 999999)
        this.$pcCookie.set({
          key: this.$enums.SMS.LOGIN_SMS,
          value: `${this.Phone}&&${random}`,
          expires: 360
        })
        this.regMessageTpl = this.regMessageTpl.replace('#parameter1', random)
        // 然后发送短信
        this.SendMsg(this.$enums.SMS.LOGIN_CODE_AL, random)
      }
    },
    // 获取token
    async GetToken () {
      const result = await GetToken()
      this.$pcCookie.set({
        key: this.$enums.USER.TOKEN,
        value: result
      })
    },
    // 创建验证码
    createSmsCode (max, min) {
      let random = Math.floor(Math.random() * (max - min)) + min
      return random
    },
    // 发送短信
    async SendMsg (TemplateCode, parameter1) {
      const result = await SendMsg({
        PhoneNumbers: this.Phone,
        TemplateCode,
        Message: this.regMessageTpl,
        TemplateParam: JSON.stringify({
          parameter1
        })
      })
      if (result.Data === 'OK') {
        HcMessageBox('验证码发送成功')
        this.countDown()
        setTimeout(() => {
          HcMessageBox.close()
        }, 1000)
        // 写入短信日志
        console.log({
          MsgName: 'RT001',
          MsgType: '1',
          Message: this.regMessageTpl,
          IsSend: true,
          SendTime: +new Date(),
          Receiver: this.Phone,
          Remark: 'Remark',
          JsonParamet: JSON.stringify({
            parameter1
          })
        })
        // await MsgLog({
        //   MsgName: '登录验证',
        //   MsgType: '1',
        //   Message: this.regMessageTpl,
        //   IsSend: true,
        //   SendTime: new Date(),
        //   Receiver: this.Phone,
        //   Remark: '',
        //   JsonParamet: JSON.stringify({
        //     parameter1
        //   })
        // })
      }
    },
    async countDown () {
      if (this.smsCodeBtn !== '获取验证码') return
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 1; i <= 60; i++) {
        this.smsCodeBtn = `${60 - i}s 重新获取`
        await delay(1000)
        if (i === 60) {
          this.smsCodeBtn = '获取验证码'
        }
      }
    },
    // test
    async LoginTest () {
      const result = await Login({
        Phone: this.Phone,
        WeChatNo: this.$pcCookie.get(this.$enums.USER.OPEN_ID)
      })
      console.log(result)
      const data = result.Data[0]
      if (result.Success) {
        // 存储相关用户信息
        this.$pcCookie.set({
          key: this.$enums.USER.LOGIN_NAME,
          value: data.Phone
        })
        this.$pcCookie.set({
          key: this.$enums.USER.ROLE_ID,
          value: data.RoleId
        })
        this.$pcCookie.set({
          key: this.$enums.USER.PHONE,
          value: data.Phone
        })
        this.$pcCookie.set({
          key: this.$enums.USER.MENUS,
          value: data.Menus
        })
        this.jump('dealer')
      }
    },
    // 登录
    async Login () {
      // 13527783971
      let storageCode = this.$pcCookie.get(this.$enums.SMS.LOGIN_SMS)
      if (storageCode) {
        let storagePhone = storageCode.split('&&')[0]
        let storageSms = storageCode.split('&&')[1]
        if (!this.validate(this.Phone, 'phone')) {
          this.$toast('手机号码格式不正确')
        } else if (storagePhone !== this.Phone) {
          this.$toast('请获取新的手机的验证码')
        } else if (this.SmsCode !== storageSms) {
          this.$toast('验证码不正确')
        } else {
          const result = await Login({
            Phone: this.Phone,
            WeChatNo: this.$pcCookie.get(this.$enums.USER.OPEN_ID)
          })
          const data = result.Data[0]
          if (result.Success) {
            // 存储相关用户信息
            this.$pcCookie.set({
              key: this.$enums.USER.LOGIN_NAME,
              value: data.Phone
            })
            this.$pcCookie.set({
              key: this.$enums.USER.ROLE_ID,
              value: data.RoleId
            })
            this.$pcCookie.set({
              key: this.$enums.USER.PHONE,
              value: data.Phone
            })
            this.$pcCookie.set({
              key: this.$enums.USER.MENUS,
              value: data.Menus
            })
            this.$pcCookie.delete({
              key: this.$enums.SMS.LOGIN_SMS
            })
            this.jump('dealer')
          }
        }
      } else {
        this.$toast('验证码不正确')
      }
    },
    getWXCode () {
      let APPID = 'wxa50176cfbb0d02ec'
      // let APPID = 'wx7c30006f971577fa';
      // let REDIRECT_URI = encodeURIComponent(`${window.location.origin}/login`);
      let REDIRECT_URI = encodeURIComponent(`https://tms.hucai.com/login`)
      let SCOPE = `snsapi_base`
      let targetUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=123#wechat_redirect`
      window.location.replace(targetUrl)
    },
    async getOpenId (code) {
      const result = await getWxOpenid({
        code,
        Appsecret: '43ee40070264740625a7989119f8ed37',
        Appid: 'wxa50176cfbb0d02ec'
      })
      return new Promise((resolve) => {
        if (result.Data) {
          resolve(result.Data)
        }
      })
    }
  },
  async mounted () {
    setTimeout(() => {
      this.HcMessageBox('成功')
      setTimeout(() => {
        this.HcMessageBox.close()
      }, 1000)
    }, 1000)
    // if(process.env.NODE_ENV === 'development') {
    //   // this.$pcCookie.set({
    //   //   key: this.$enums.USER.OPEN_ID,/*  */
    //   //   value: "oprKT5wyduR3BgXqFSTy9RsHt6jQ"
    //   // });
    // }
    // if (!this.$pcCookie.get(this.$enums.USER.OPEN_ID)) {
    //   if (!!this.$route.query.code) {
    //     const result = await this.getOpenId(this.$route.query.code);
    //     if (!result.errcode) {
    //       this.$pcCookie.set({
    //         key: this.$enums.USER.OPEN_ID,
    //         value: result.openid
    //       });
    //     }
    //     this.jump("login");
    //   } else {
    //     this.getWXCode();
    //   }
    // }
  }
}
</script>

<style lang="scss">
.hc-login {
  padding: 0 px2rem(15);
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .hc-login-box {
    width: 100%;
    height: px2rem(45);
    border: 1px solid #e5e5e5;
    background-color: #fff;
    position: relative;
    margin-bottom: px2rem(20);
    .hc-sms-disabled {
      background-color: #b3b3b3 !important;
    }
    input {
      border: none;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
    }
    button {
      width: px2rem(120);
      height: 100%;
      background-color: #07c160;
      position: absolute;
      right: 0px;
      top: 0px;
      border: none;
      color: #fff;
      font-size: px2rem(14);
      padding: 0px;
      .hc-sms-code-text {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .hc-login-btn {
    button {
      margin-top: px2rem(25);
      border-radius: 100px;
    }
  }
}
</style>
