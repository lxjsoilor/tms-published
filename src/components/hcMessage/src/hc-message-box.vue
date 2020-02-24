<template>
  <div class="">
    <van-overlay
      :show="value"
    />
      <div class="hc-msgbox hc-message-box" :class="{'hc-padding0':!(showCancelButton||showConfirmButton),'hc-isToast': !isToast}" v-show="value">
        <div class="hc-message">
          <div>
            <div v-show="!!title" v-html="title" class="hc-message-title"></div>
            <div class="hc-message-content" v-show="needIcon">
              <span class="hc-message-content-icon" :class="iconType == 'ok' ? 'hc-message-content-icon-ok' : 'hc-message-content-icon-err' "></span>
            </div><div class="hc-message-content" v-html="message"></div>
          </div>
          <div v-show="needClose" class="hc-message-close" @click="handleAction('close')">
            <span class="iconfont my-icon-baseline-close-px"></span>
          </div>
        </div>
        <div v-if="isToast" class="hc-message-btn">
          <button v-if="showCancelButton" :style="{color: !needClose?'':'#77CEB8'}" class="hc-btn-cancel" @click="handleAction('cancel')">{{cancelButtonText}}</button>
          <button v-if="showConfirmButton" :style="{color: showCancelButton?'':'#77CEB8'}" @click="handleAction('confirm')">{{confirmButtonText}}</button>
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.hc-isToast {
  height: px2rem(90) !important;
  width: px2rem(220) !important;
  min-height: px2rem(90) !important;
  min-width: px2rem(220) !important;
}
.hc-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s;
  transition: .2s;
}
.hc-padding0 {
  padding: 0px !important;
}
.hc-message-box {
  border-radius: 3px;
  min-height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 58px;
  position: fixed;
  z-index: 100;
}
.hc-message {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 5px !important;
  text-align: center;
}
.hc-message-title {
  font-size: px2rem(16) !important;
  color: #FF5D00;
}
.hc-message .hc-message-icon {
  font-size: 30px;
  vertical-align: middle;
  margin-right: 10px;
}
.hc-message-content {
  display: inline-block;
  vertical-align: middle;
  font-size: px2rem(14) !important;
  .hc-message-content-icon {
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    background-image: url('data:image/png;base64,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');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    &.hc-message-content-icon-err {
      background-image: url('data:image/png;base64,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') !important;
    }
  }
}
.hc-message div {
  font-size: 16px;
  vertical-align: middle;
}
.hc-message-close {
  position: absolute;
  padding: 8px;
  right: 0px;
  top: 0px;
  .iconfont {
    font-size: px2rem(18);
    color: #7A7A7A;
  }
}
.hc-message-btn {
  height: 58px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  text-align: center;
  width: 100%;
  display: flex;
  border-top: 1px solid #cccccc;
}
.hc-message-btn button {
  line-height: 58px;
  border: none;
  background: none;
  width: 49%;
  font-size: px2rem(16);
  position: relative;
  flex: 1;
  color: #77CEB8;
}
.hc-message-btn button:focus {
  border: none;
  box-shadow: none;
  outline: 0;
}
.hc-message-btn button:first-child {
  color: #808080;

}
.hc-btn-cancel::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 40px;
  right: -2px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  background-color: #cccccc;
  position: absolute;
}

</style>

<script type="text/babel">
/* eslint-disable */
  export default {
    props: {
      messageIcon: {
        type: String,
        default: ''
      },
      modal: {
        default: true
      },
    },

    data() {
      return {
        message: '',
        title: '账号未激活',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: '',
        cancelButtonText: '',
        needClose: false,
        value: false,
        needIcon: true,
        iconType: 'ok'
      };
    },

    computed: {
      isToast() {
        return this.showCancelButton||this.showConfirmButton;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;
        this.onClose && this.onClose();
        var that = this
        setTimeout(() => {
          if (that.modal && that.bodyOverflow !== 'hidden') {
            document.body.style.overflow = that.bodyOverflow;
            document.body.style.paddingRight = that.bodyPaddingRight;
          }
          that.bodyOverflow = null;
          that.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },
      handleAction(action) {
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

    },

  };
</script>
