<template>
  <div class="hc-register">
    <div class="hc-register-process">
      <div class="hc-register-pro" :class="isRegStep1 ? 'hc-active' : ''">
        <span class="hc-register-icon">1</span>
        手机验证
      </div>
      <div class="hc-register-pro hc-register-pro2">
        <div class="hc-register-pro-icon"></div>
      </div>
      <div class="hc-register-pro" :class="!isRegStep1 ? 'hc-active' : ''">
        <span class="hc-register-icon">2</span>
        验证合同
      </div>
    </div>
    <div v-show="isRegStep1">
      <div class="hc-register-box">
        <input placeholder="请输入手机号" v-model="Phone" maxlength="11" type="text">
        <button :class="smsCodeBtn !== '获取验证码' ? 'hc-sms-disabled' : ''" @click="handlerGetSmsCode">
          <div class="hc-sms-code-text" v-ripple>{{smsCodeBtn}}</div>
        </button>
      </div>
      <div class="hc-register-box">
        <input placeholder="请输入验证码" v-model="SmsCode" maxlength="6" type="text">
      </div>
      <div class="hc-register-btn">
        <van-button v-ripple type="primary" @click="handlerNextStepTest" size="large">下一步</van-button>
      </div>
    </div>
    <div v-show="!isRegStep1">
      <div class="hc-register-contract-box">
        <!-- <div class="hc-register-contract">
          电子合同显示区域
        </div> -->
        <div>
          <h3 style="text-align: center;">泰啤物流微信公众号注册协议</h3>
          <h4 style="text-align: left;">序言：</h4>
          <p>
            在此特别提醒您（用户）在注册成为泰啤物流微信公众号用户之前，请认真阅读本《用户注册协议》（以下简称“协议”），确保您充分理解本协议中各条款。您需同意并点击确认本协议条款且完成注册程序后，才能成为泰啤物流微信公众号服务的正式注册用户。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。 本协议约定泰啤物流与用户（经销商、承运商、驾驶员）之间关于“泰啤物流微信公众号”服务（以下简称“服务”）的权利、义务。本协议可由泰啤物流随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用泰啤物流微信公众号所提供的服务，用户继续使用泰啤物流微信公众号提供的服务将被视为接受修改后的协议并接受协议条款的约束。
          </p>
          <h4>服务的中断&终止：</h4>
          <p>1、泰啤物流需要定期或不定期地对公众号进行检测或更新，如因此类情况而造成微信公众号应用服务在合理时间内的中断，泰啤物流无需为此承担任何责任。</p>
          <p>2、在用户（经销商、承运商、驾驶员）违反本服务协议中的相关条款时，泰啤物流有权终止向该用户提供服务。如未向泰啤物流报备、获允，该用户再一次直接或间接或以他人名义注册为新用户的，一经发现，泰啤物流有权直接单方面终止向该用户提供服务。</p>
          <p>3、本服务条款终止或更新时，用户明示不愿接受新的服务条款。</p>
          <p>4、本协议终止及用户的服务被终止后，泰啤物流仍有权继续向用户主张在其使用泰啤物流微信公众号应用服务期间因违反法律法规、本协议规则而应承担的责任。</p>
          <h4>免责与赔偿声明：</h4>
          <p>1、用户在使用本服务前需要注册一个“泰啤物流微信公众号”账号，请用户使用尚未与“泰啤物流微信公众号”账号绑定的手机号码，以及未被泰啤物流根据本协议封禁的手机号码注册“泰啤物流微信公众号”账号。</p>
          <p>2、用户一旦注册成功，成为泰啤物流微信公众号的用户，将得到一个用户名（即注册的手机号码，以下简称“用户名”）和验证码，用户有权利使用自己的用户名及验证码随时登陆泰啤物流微信公众号应用，并查看所属货物的物流信息动态以及进行其他操作。</p>
          <p>3、用户不得以任何形式擅自转让或授权他人使用自己的泰啤物流微信公众号用户名，如因擅自转让或授权所带来的风险及后果由用户自行承担。</p>
          <p>4、用户对验证码应妥善保管，切勿将验证码告知他人，因验证码保管不善而造成的所有损失由用户自行承担。</p>
          <p>5、若泰啤物流已经明示其服务提供方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担。</p>
          <p>6、用户明确同意其使用泰啤物流微信公众号应用服务所存在的风险将完全由其自己承担，因其使用泰啤物流微信公众号应用服务而产生的一切后果也由其自己承担。</p>
          <p>7、用户同意保障和维护泰啤物流及其他用户的利益，由于用户在使用泰啤物流微信公众号应用服务有违法、不真实、不正当、侵犯第三方合法权益的行为，或用户违反本协议项下的任何条款而给泰啤物流及任何其他第三方造成损失，用户同意承担由此造成的损害赔偿责任。</p>
          <h4>其他：</h4>
          <p>1、泰啤物流郑重提醒用户注意本协议中免除泰啤物流责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。</p>
          <p>2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和泰啤物流之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交泰啤物流住所地有管辖权的人民法院管辖。</p>
          <p>3、协议最终解释权归泰啤物流所有，并且保留一切解释和修改的权力。</p>
          <p>4、本协议从2019年09月01日起适用。</p>
          <h3>经销商账号注册：</h3>
          <h4>1、订单提报：</h4>
          <p>（1）经销商在APP提报订单时应严格遵守泰啤公司常温酒、原浆酒的提报时间、倍数规则（黑啤、180天、28天12瓶装、7天纸箱12瓶装是75的倍数，28天9瓶装是60的倍数）进行提报，如不按倍数提报，物流部将不予进行系统排线及安排配送。</p>
          <p>（2）经销商在APP提报订单时应选择正确的卸货点信息，并保证该信息与实际卸货点信息一致，物流部将根据订单备注的卸货点信息安排相关的配送线路。</p>
          <p>（3）订单正常提报期间如有订单取消、调整以及卸货点信息变动等事宜，经销商必须及时告知物流部工作人员（当天16：00之前），超过该时间段之后再进行相关的调整，请恕物流部不予受理，给物流部造成损失的由相关经销商承担赔偿责任。</p>
          <p>（4）在物流部进行系统排线并知会承运商之后，如经销商临时加酒造成车辆配载超吨的，泰啤物流有权协调并建议该经销商取消订单或改为下批次提报相关订单。</p>
          <p>（5）如经销商私下联系承运商并擅自更改卸货地点，由此带来的风险及责任由当事双方自行承担。</p>
          <p>（6）经销商应根据自身的实际需求提报订单量，对于有承运商私下联系经销商并要求经销商追加订单数量或虚报卸货点以实现其车辆吨位上调、运费增高的行为，一经核实则取消相关经销商的配送资格，对承运商不予结算当车次运费。</p>
          <h4>2、收货&签评：</h4>
          <p>（1）配送车辆抵达卸货点后，经销商需第一时间安排卸车事宜（不得强制要求驾驶员进行卸车作业），理论上100箱货物的卸货时长约半小时左右，其它时长依次类推。原则上经销商的所有货物应全部落地，严禁不听从驾驶员现场指挥出现错拿、乱卸以及占用车辆进行二次分拨等现象，否则泰啤物流有权取消该经销商的配送资格。</p>
          <p>（2）如卸货地点处于货车限行、禁行区域，则需经销商配合泰啤物流办理相应的货车通行手续（如货车被抓拍或贴条，经销商需负责协调、处理并承担相应处罚结果）或自行安排车辆在非禁行路段进行接货，否则泰啤物流有权取消该经销商的配送资格。</p>
          <p>（3）需要经销商安排接货的，经销商需在双方约定的地点准时接货。在未和泰啤物流沟通及获取同意的前提下，经销商不得随意更换接货地点，否则泰啤物流有权取消经销商的配送资格，由此给泰啤物流或其他配车客户带来的损失，由当事经销商承担相关。</p>
          <p>（4）如车辆抵达后，通过系统登记联系方式或其他联系方式均无法联系到该经销商时，超过1小时等待时间后配送车辆则进行下一客户的货物配送安排，当事经销商的相关货物则卸于下一经销商处（驾驶员会将现场货物拍照留存并转发当事经销商），并由当事经销商自行安排提货事宜、承担卸车费用。如经销商要求折返配送的，泰啤物流有权向该经销商追偿此情况下所增加的折返物流费用。</p>
          <p>（5）对于返厂的物料，经销商需要现场和驾驶员确认好相关物料的规格、数量、质量，并在返厂回执单据上做好清晰、准确的备注，以便后续部门的核实。（最终挂账明细以瓶厂发送的回执短信为准）</p>
          <p>（6）现场出现交付异常时（例：爆瓶、缺失、纸箱浸湿等）可在微信公众号应用内进行异常提报，提报时需提供现场异常的图片或视频。对于经销商已经正常签收后再反馈配送异常的，请恕泰啤物流部不予受理。</p>
          <p>（7）卸车完毕后请经销商于第一时间进行纸质单据的签收并加盖印章，在进行系统签收时需要经销商将短信验证码及时转发（告知）给驾驶员并由驾驶员进行系统签收的操作。如果经销商不进行纸质单据的签收也不向驾驶员提供签收验证码，则TMS物流系统将在卸货完成半小时后自动进行系统签收。不论是系统自动签收还是经销商自行签收均视为当事经销商已正常签收，且无异议。</p>
          <p>（8）签收完毕后请在系统签收评价界面对承运商及驾驶员的服务予以客观、真实的服务评价，您的评价将作为泰啤承运商的KPI考核最重要的参考指标。针对配送过程中存在的问题，泰啤物流将积极采纳并持续改进，以努力为经销商提供更优异的物流服务体验。</p>
          <h3>二、承运商账号注册：</h3>
          <h4>1、车辆信息反馈&派车：</h4>
          <p>（1）为提高物流部派车操作的效率，承运商需要将可派车辆信息及时的反馈至物流部调度员处以便其进行系统派车的操作。（信息反馈时间为当日17：00之前，而且TMS系统一旦进行派车后原则上不可再更改承运车辆信息）。</p>
          <p>（2）针对承运商私下联系经销商让其增加订单数量或虚报卸货点信息，以实现承运商车辆吨位上调、运费提高的行为，一经查实则取消涉事经销商的配送资格。另外对涉事承运商的相关运费将不予结算，情节恶劣的将解除运输合同。</p>
          <h4>2、装车&发运：</h4>
          <p>（1）在工厂装车及运输过程中，承运商需要充分的做好货物的防丢、防损、防湿箱、防窜货的保护措施，以防止交付货物时出现异常。</p>
          <p>（2）承运商需严格按照物流部安排的线路及配载进行运行，不得擅做调整。对于违反规定的则按照物流部承运商管理条例进行处罚</p>
          <p>（3）对于运输中突发的异常情况，承运商应及时的向物流部反馈并在微信公众号应用中提报相关异常信息，以便物流部及经销商及时了解异常信息，并及时做出调整。</p>
          <p>（4）装车、发运、交货等环节的操作事宜由各承运商负责协调各自驾驶人员。</p>
          <h3>三、驾驶员账号注册：</h3>
          <h4>1、装车&发运：</h4>
          <p>（1）在工厂装车时，驾驶员需对车辆装载的货物规格、数量及质量做初步核实。</p>
          <p>（2）在工厂装车时驾驶员需要对同品类常温酒做有效的隔离，以防止窜货现象的发生。</p>
          <p>（3）装车时驾驶员需要充分的做好货物的防丢、防损、防湿箱的保护措施，以防止交付货物时出现异常。</p>
          <p>（4）装车完毕后驾驶员需在终端打印设备输入自己手机号码并打印出发货单据，打印操作完成后驾驶员应及时进行配送工作，不可拖延配送时间，如出现不可抗拒因素导致延缓发车，驾驶员应及时在公众号内进行异常提报。</p>
          <p>（5）驾驶员需严格按照公司安排线路进行配送。未经物流部批准，驾驶员不得擅自调整配送线路及卸货点先后顺序。</p>
          <p>（6）运输途中如遇到堵车、修路或其他异常情况时，驾驶员要第一时间拍照并在微信公众号应用内进行异常提报，以便经销商及物流部及时根据信息作出调整。</p>
          <h4>2、交货&签收：</h4>
          <p>（1）驾驶员在卸货现场应对纸箱酒进行防窜货扫码操作，并将扫码截图发送至物流沟通群内，对于不执行此操作流程的驾驶员根据销管部相关考核标准进行处罚。</p>
          <p>（2）对于现场出现的数量缺失、爆瓶、湿箱等异常情况，驾驶员应及时在微信公众号应用内进行提报，并如实提供现场异常图片、视频。对驾驶员单方面原因造成的异常，驾驶员应积极与客户协商赔付事宜。如发现有违规操作、上报的驾驶员，则视情节处进行相应的处罚。</p>
          <p>（3）关于返厂物料（罐、筐、瓶等），驾驶员需要在现场与经销商共同核实物料的规格、数量，双方无异议后由经销商在回执单据上签字确认，驾驶员需对当车次返厂的物料明细负责，如出现数量缺失需承担相应赔偿责任。</p>
          <p>（4）卸货完毕后，驾驶员应第一时间与经销商（代理人）共同验收现场交付的货物，并要求经销商（代理人）及时的签收回执单据并加盖印章。在进行系统签收时，驾驶员应及时的向收货联系人索要“签收验证码”，并在微信公众号应用中完成系统签收操作。（收货人提供验证码后驾驶员应于五分钟内进行系统签收操作）</p>
          <p>（5）驾驶员是泰啤物流与终端客户沟通的最后一个环节，是展示泰啤物流服务最重要的媒介也是宣传泰啤物流形象的最重要的窗口。因此驾驶员的一言一行都会使客户对泰啤物流的认可与否产生较为重要、深刻的影响。本着服务至上的原则，驾驶员在现场对客户的合理化诉求一定要尽力配合、满足，对于不合理的诉求，驾驶员可上报物流部，由物流部来进行与客户的协调、处理工作。严禁驾驶员在客户处宣传不利于公司形象的言论，从事不利于泰啤利益的行为。如有存在上述行为的驾驶员，一经泰啤公司查实则予以解雇（或要求承运商解雇），对其不良行为所产生的不利影响，泰啤公司保留索赔的权利。</p>
        </div>
      </div>
      <div class="hc-register-btn">
        <div class="hc-register-check" @click="handlerChangeRadio">
          <van-radio-group v-model="radio">
            <van-radio disabled checked-color="#07c160" name="1">本人已认真阅读该协议，并同意此条款。</van-radio>
          </van-radio-group>
        </div>
        <van-button v-ripple type="primary" @click="handlerRegister" size="large">提交注册</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import { GetToken, GetMsgTemplateByCode, SendMsg, Register } from '../../api/ajax.js'

import { HcMessageBox } from '../../components/hcMessage/index.js'
export default {
  data () {
    return {
      Phone: '',
      SmsCode: '',
      regMsgCode: 'RT008',
      regMessageTpl: '',
      isRegStep1: true,
      radio: '1',
      smsCodeBtn: '获取验证码'
    }
  },
  methods: {
    handlerRegister () {
      if (this.radio !== '1') {
        this.$toast('请勾选服务协议')
      } else {
        this.Register()
      }
    },
    handlerChangeRadio () {
      if (this.radio === '1') {
        this.radio = '2'
      } else {
        this.radio = '1'
      }
    },
    handlerNextStepTest () {
      this.isRegStep1 = false
    },
    handlerNextStep () {
      // 验证验证码是否正确
      let storageCode = this.$pcCookie.get(this.$enums.SMS.REG_SMS)
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
          this.$pcCookie.delete({
            key: this.$enums.SMS.REG_SMS
          })
          this.isRegStep1 = false
        }
      } else {
        this.$toast('请先获取手机验证码')
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
    // 获取短信模板
    async GetMsgTemplateByCode (MsgCode) {
      const result = await GetMsgTemplateByCode({
        MsgCode
      })
      if (result.Success) {
        this.regMessageTpl = result.Data[0].Message
        let random = this.createSmsCode(100000, 999999)
        this.$pcCookie.set({
          key: this.$enums.SMS.REG_SMS,
          value: `${this.Phone}&&${random}`,
          expires: 360
        })
        this.regMessageTpl = this.regMessageTpl.replace('#parameter1', random)
        // 然后发送短信
        this.SendMsg(this.$enums.SMS.REG_CODE_AL, random)
      }
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
        Message: this.regMessageTpl,
        TemplateCode,
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
        // await MsgLog({
        //   MsgName: '注册验证',
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
    // 注册
    async Register () {
      const result = await Register({
        Phone: this.Phone,
        WeChatNo: this.$pcCookie.get(this.$enums.USER.OPEN_ID)
      })
      if (result.Success) {
        HcMessageBox('注册成功')
        setTimeout(() => {
          HcMessageBox.close()
          this.jumpReplace('login')
        }, 1000)
      }
      if (result.ResultMessage === '手机号码已注册!') {
        this.regMessageTpl = true
      }
    },
    handlerGetSmsCode () {
      if (this.smsCodeBtn !== '获取验证码') return
      if (this.validate(this.Phone, 'phone')) {
        this.GetMsgTemplateByCode(this.$enums.SMS.REG_CODE)
      } else {
        this.$toast('手机号码格式不正确')
      }
    },

    async countDown () {
      if (this.smsCodeBtn !== '获取验证码') return
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 1; i <= 60; i++) {
        this.smsCodeBtn = `${(60 - i)}s 重新获取`
        await delay(1000)
        if (i === 60) {
          this.smsCodeBtn = '获取验证码'
        }
      }
    }
  },
  mounted () {
    if (!this.$pcCookie.get(this.$enums.USER.OPEN_ID)) {
      this.jump('login')
    }
  }
}
</script>

<style lang="scss">
.hc-register {
  padding: 0 px2rem(15);
  .hc-register-process {
    text-align: center;
    width: px2rem(200);
    height: px2rem(20);
    margin: auto;
    margin-bottom: 20px;
    margin-top: 40px;
    .hc-register-icon {
      width: px2rem(18);
      height: px2rem(18);
      display: inline-block;
      background-color: #b3b3b3;
      text-align: center;
      line-height: px2rem(18);
      color: #fff;
      font-size: 12px;
      border-radius: 50%;
      vertical-align: middle;
      transform: translateY(-2px);
    }
    .hc-register-pro {
      width: 40%;
      float: left;
      color: #b3b3b3;
      vertical-align: middle;
      &.hc-active {
        color: #333333;
        .hc-register-icon {
          background-color: #77ceb8;
        }
      }
    }
    .hc-register-pro2 {
      width: 20% !important;
      height: 100%;
      background-color: #fff;
      position: relative;
      .hc-register-pro-icon {
        width: 60%;
        height: 1px;
        background-color: #b3b3b3;
        position: absolute;
        left: 0px;
        bottom: 0px;
        right: 0px;
        top: 0px;
        margin: auto;
      }
    }
  }
  .hc-register-box {
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
      width: px2rem(210);
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
  .hc-register-contract-box {
    width: 100%;
    height: px2rem(400);
    overflow: scroll;
    .hc-register-contract {
      border: 1px solid #e2e2e2;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #7a7a7a;
    }
  }
  .hc-register-check {
    padding: 10px 10px;
    .van-radio__label--disabled {
      color: #333333;
    }
    .van-radio__icon--checked .van-icon {
      background-color: #07c160 !important;
    }
    .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
      color: #fff !important;
    }
  }
  .hc-register-btn {
    background-color: #fff;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    left: 0px;
    padding: 20px;
    bottom: 0px;
    button {
      border-radius: 100px;
    }
  }
}
</style>
