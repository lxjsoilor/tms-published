<template>
  <div>
    <!-- <hcLoading v-model="loading"/> -->
    <transition :name="'fade'">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="hc-Router"></router-view>
      </keep-alive>
    </transition>
    <transition :name="'fade'">
      <router-view v-if="!$route.meta.keepAlive" class="hc-Router"></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      keepAlive: 'main-keep-alive',
      transitionName: 'slide-right',
      loading: true
    }
  },
  watch: {
    $route (to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style lang="scss">
.hc-Router {
  position: fixed;
  height: 100%;
  width: 100%;
  transition: all 0.377s ease;
  will-change: transform;
  top: 0;
  backface-visibility: hidden;
  perspective: 1000;
}
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
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
