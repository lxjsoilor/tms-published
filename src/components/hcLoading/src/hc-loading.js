/* eslint-disable */
import Vue from 'vue';
import msgboxVue from './hc-loading.vue';

// 组件构造器
let HcLoadingConstructor = Vue.extend(msgboxVue);
let currentMsg, instance;
let msgQueue = [];

let defaultCallback = action => {
  if (currentMsg) {
    if (currentMsg.resolve) {
      let $type = currentMsg.options.$type;
      if ($type === 'confirm' || $type === 'alert') {
        if (action === 'confirm') {
            currentMsg.resolve(action);
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};
// 创建并且挂载到虚拟dom上
let initInstance = function() {
  instance = new HcLoadingConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

let showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if (!instance.value) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      document.body.appendChild(instance.$el);
      Vue.nextTick(() => {
        instance.value = true;
        setTimeout(() => {
          HcLoading.close()
        }, 5000)
      });
    }
  }
};

// 方法调用（普通弹窗）
let HcLoading = function(options) {
  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) {
      msgQueue.push({
        options: {},
        resolve: resolve,
        reject: reject
      });
      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: {},
    });
    showNextMsg();
  }

};

// confirm弹窗
HcLoading.show = function(message, options) {
  return HcLoading();
};

// 关闭弹框
HcLoading.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

export default HcLoading;
export { HcLoading };
