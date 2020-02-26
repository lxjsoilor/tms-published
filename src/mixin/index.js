/* eslint-disable */
import { HcMessageBox } from "components/hcMessage/index.js";
import { PcCookie, gbs } from '../utils/index';

let mixin = {
  data() {
    return {
      HcMessageBox,
      PcCookie,
      gbs
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back(url) {
      this.$router.back()
    },
    getUrlParam(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    getUrlQuery(url, name) {
      let search = url.split('?')[1] || '';
      let tempArr = search.split('&');
      let tempObj = {};
      tempArr.forEach(val => {
        let valArr = val.split('=');
        tempObj[valArr[0]] = valArr[1];
      });
      return tempObj;
    },
    jump(routerName, param) {
      if (param) {
        this.$router.push({ name: routerName, query: param });
      } else {
        this.$router.push({ name: routerName });
      }
    },
    jumpReplace(routerName, param) {
      if (param) {
        this.$router.replace({ name: routerName, query: param });
      } else {
        this.$router.replace({ name: routerName });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.jump('mdcf');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate(value, type) {
      // 非空验证
      if (type === 'require') {
        return !!value;
      }
      // 手机号验证
      if (type === 'phone') {
        return /^1\d{10}$/.test(value);
      }
      // 邮箱格式验证
      if (type === 'email') {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
      if (type === 'pwd') {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
      }
      if (type === 'number') {
        return /^[0-9]*$/.test(value);
      }
      if (type === '+number') {
        return /^[1-9]\d*$/.test(value);
      }
      if (type === 'number.') {
        return /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])|(0)$/.test(value);
      }
      if (type === 'number.2') {
        return /^\d+(\.\d{1,2})?$/.test(value);
      }
      if (type === 'discount') {
        return /^(?:([1-9](?:\.[\d]{0,1})?)|(?:0\.[1-9]{1,1})|10)$/.test(value);
      }
    },
    // js精确算法函数
    operationAdd(arg1, arg2) {
      let r1, r2, m, c;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      c = Math.abs(r1 - r2);
      m = Math.pow(10, Math.max(r1, r2));
      if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
          arg1 = Number(arg1.toString().replace(".", ""));
          arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
          arg1 = Number(arg1.toString().replace(".", "")) * cm;
          arg2 = Number(arg2.toString().replace(".", ""));
        }
      } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
      }
      return (arg1 + arg2) / m;
    },
    operationSub(arg1, arg2) {
      let r1, r2, m, n;
      try {
        r1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    operationMul(arg1, arg2) {
      var m = 0, s1 = arg1.toString(),
        s2 = arg2.toString();
      try { m += s1.split(".")[1].length } catch (e) { };
      try { m += s2.split(".")[1].length } catch (e) { };
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // 去除空格
    hcTrim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 去除所有空格
    hcTrimAll(str) {
      return str.replace(/\s+/g, "")
    },
    // 格式化金额
    amountFormat(number, decimals = 2, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = (n, prec) => {
          var k = Math.pow(10, prec);
          return '' + Math.ceil(this.operationMul(n, k)) / k;
        };
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      };
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      };
      return s.join(dec);
    },
    // 获取定位
    geolocation() {
      return new Promise(function (resolve, reject) {
        let geolocation = new BMap.Geolocation()
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            resolve(r)
          } else {
            reject(r)
          }
        }, { enableHighAccuracy: true })
      })
    },
    getLocation(pt) {
      return new Promise(function (resolve) {
        let geoc = new BMap.Geocoder();
        geoc.getLocation((new BMap.Point(...pt)), function(result) {
          resolve(result)
        })
      })
    },
    async getCurrentAddress() {
      const { point: {lng, lat} } = await this.geolocation()
      return await this.getLocation([lng, lat])
    }
  }
};

export default mixin;
