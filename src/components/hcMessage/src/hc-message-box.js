/* eslint-disable */
import Vue from 'vue';
import msgboxVue from './hc-message-box.vue';

let defaults = {
  message: '',
  title: '',
  iconType: 'ok',
  needIcon: true,
  closeOnClickModal: true, // 背景层点击是否可以关闭
  showConfirmButton: false, // 展示确定按钮
  showCancelButton: false, // 展示取消按钮
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  messageIcon: '#icon-ziyuan4', // svg图标
  needClose: false
};

// 合并对象
let merge = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

// 组件构造器
let HcMessageBoxConstructor = Vue.extend(msgboxVue);
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
  instance = new HcMessageBoxConstructor({
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
      });
    }
  }
};

// 方法调用（普通弹窗）
let HcMessageBox = function(options) {
  var icon = '';
  switch(options.icon) {
    case 'success':
      icon = "#icon-ziyuan4";
      break;
    case 'error':
      icon = "#icon-ziyuan5";
      break;
    case 'caution':
      icon = "#icon-ziyuan6";
      break;
    case 'confirm':
      icon = "#icon-ziyuan7";
      break;
    default:
      icon = '#icon-ziyuan4';
      break;
  }
  if (typeof options.message === 'string') {
    options = merge({
      message: options.message,
      messageIcon: icon
    }, options)

    if (arguments[1]) {
      options.message = arguments[1];
      options.messageIcon = icon
    }
  }

  if (typeof options === 'string') {
    options = {
      message: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) {
      msgQueue.push({
        options: merge({}, defaults, HcMessageBox.defaults || {}, options),
        resolve: resolve,
        reject: reject
      });
      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, HcMessageBox.defaults || {}, options),
    });
    showNextMsg();
  }
};

// alert弹窗
HcMessageBox.alert = function(message, options) {
  return HcMessageBox(merge({
    $type: 'alert',
    message: message,
    // showCloseButton: showCloseButton ? showCloseButton : true,
    closeOnClickModal: false,
    showCancelButton: true,
    showConfirmButton: true,
    messageIcon: '#icon-ziyuan6'
  }, options));
};

// confirm弹窗
HcMessageBox.confirm = function(message, options) {
  return HcMessageBox(merge({
    $type:'confirm',
    message: message,
    closeOnClickModal: false,
    showConfirmButton: true,
    messageIcon: '#icon-ziyuan7'
  }, options));
};

// 关闭弹框
HcMessageBox.close = function() {
  if (!instance) return;
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

export default HcMessageBox;
export { HcMessageBox };
