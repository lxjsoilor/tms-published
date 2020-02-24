/**
* 组件名称
* @desc 前端弹框封装
* @author 林雄军
* @date 2018年08月20日
* @param 提示语
* @example 调用示例
 * 1，普通弹窗
 *    HcMessageBox('验证码发送成功').then((result) => { console.log(result) })
 * 2，alert弹窗
 *    HcMessageBox.alert('验证码发送成功',{配置内容}).then(result => { console.log(result) }).catch((result) => { console.log(result) })
 *    HcMessageBox.confirm('验证码发送成功', {
        needClose: true,
        title: 'title',
        iconType: 'err',
        confirmButtonText: '重新注册'
      });
 *
 *
 * 3，confirm弹窗
 *    HcMessageBox.confirm('验证码发送成功',{配置内容}).then(result => { console.log(result) }).catch((result) => { console.log(result) })
*/
import HcMessageBox from './src/hc-message-box.js'
export { HcMessageBox }
