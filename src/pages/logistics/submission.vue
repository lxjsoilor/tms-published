<template>
  <div class="hc-submission">
    <van-nav-bar title="运单详细信息" left-arrow bind:click-left="onClickLeft" bind:click-right="onClickRight" fixed border />
    <div>
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-ripple @click="handlerChangeTab(1)">
          <div class="hc-submission-tab" :class="{ 'hc-active': submissionType === 1 }">
            <span class="iconfont my-icon-road"></span>
            <div>路况异常</div>
          </div>
        </van-grid-item>
        <van-grid-item v-ripple @click="handlerChangeTab(2)">
          <div class="hc-submission-tab" :class="{ 'hc-active': submissionType === 2 }">
            <span class="iconfont my-icon-car"></span>
            <div>路况异常</div>
          </div>
        </van-grid-item>
        <van-grid-item v-ripple @click="handlerChangeTab(3)">
          <div class="hc-submission-tab" :class="{ 'hc-active': submissionType === 3 }">
            <span class="iconfont my-icon-warning"></span>
            <div>路况异常</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          readonly
          name="异常编号"
          label="异常编号"
          placeholder="异常编号"
        />
        <van-field
          class="hc-submission-field"
          readonly
          right-icon="location"
          name="异常位置"
          label="异常位置"
          placeholder="异常位置"
          v-model="submissionForm.address"
        />
        <van-field class="hc-submission-upload" name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="submissionImgList" :max-count="6"/>
          </template>
        </van-field>
        <div class="hc-submission-button">
          <van-button v-ripple round type="primary" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submissionType: 1,
      submissionImgList: [],
      submissionForm: {
        address: ''
      }
    }
  },
  methods: {
    handlerChangeTab (type) {
      this.submissionType = type
    },
    onSubmit () {
      this.HcMessageBox('异常提交成功')
      setTimeout(() => {
        this.HcMessageBox.close()
      }, 1000)
    },
    async getAddress () {
      const result = await this.getCurrentAddress()
      this.submissionForm.address = result.address
    }
  },
  mounted () {
    this.getAddress()
  }
}
</script>

<style lang="scss">
.hc-submission {
  padding-top: 45px;
  .hc-submission-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >span {
      color: #7d8c89;
      transition: .5s all;
      font-size: 40px;
    }
    &.hc-active {
      color: #008b67 !important;
      >span {
        color: #008b67 !important;
      }
    }
  }
  .hc-submission-field {
    .van-icon {
      color: #008b67;
    }
  }
  .hc-submission-button {
    margin-top: 20px;
    text-align: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    button {
      width: 180px;
    }
  }
}
</style>
