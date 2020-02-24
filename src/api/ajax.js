/* eslint-disable */
import axios from './config'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
import { PcCookie, enums } from '../utils'
import { Toast } from 'vant'
// 后台数据返回成功标识
export const ERR_OK = '000'
// TOKEN过期
export const TOKEN_EXPIRE = '320'
// 生成验证信息
export function createVerify () {
  let Timestamp = (+new Date() + '').slice(0, -3)
  let Appid = '8309472954'
  let Nonce = Math.random() + ''
  let Signature = md5(`${Appid}${Timestamp}${Nonce}`).toUpperCase()
  let Factory = PcCookie.get(enums.USER.TEMP_FACTORY) || PcCookie.get(enums.USER.FACTORY) || '1000'
  let Data = [{}]
  let Token = PcCookie.get(enums.USER.TOKEN)
  return {
    Signature,
    Timestamp,
    Nonce,
    Appid,
    Factory,
    Token,
    Data
  }
}
let verifyObjOrg = createVerify()
// 页面接口通用接口 Post
export const ajaxPost = async function (url = '', data = {}, option = {}) {
  let verifyObj = JSON.parse(JSON.stringify(verifyObjOrg))
  verifyObj.Token = PcCookie.get(enums.USER.TOKEN) || ' '
  verifyObj.Data = [{}]
  if (option.contentType) axios.defaults.headers['Content-Type'] = option.contentType
  else axios.defaults.headers['Content-Type'] = 'application/json'
  if (data.length > 0 && data.length != undefined) {
    verifyObj.Data = data
  } else {
    verifyObj.Data[0] = JSON.parse(JSON.stringify(data || {}))
  }
  let params = JSON.parse(JSON.stringify(verifyObj))
  try {
    Toast.loading({
      duration: 20000
    })
    let result = await axios.post(url, params, option)
    return new Promise((resolve, reject) => {
      Toast.clear()
      if (url === '/api/Token/GetToken') {
        resolve(result.data)
      } else {
        // console.log(result, 1010)
        if (typeof result.data.Data === 'string') {
          try {
            if (result.data.Data) result.data.Data = JSON.parse(result.data.Data)
          } catch (err) {
            resolve(result.data)
          }
        }
        if (!result.data.Success) {
          Toast(result.data.ResultMessage)
        }
        resolve(result.data)
      }
    })
  } catch (err) {
    Toast.clear()
    console.log(err.response.data)
    if (err.response.data.ResultCode === '320') {
      Toast('登录过期，请重新登录！')
      setTimeout(() => {
        PcCookie.delete({
          key: enums.USER.TOKEN
        })
        PcCookie.delete({
          key: enums.USER.LOGIN_NAME
        })
        PcCookie.delete({
          key: enums.USER.ROLE_ID
        })
        PcCookie.delete({
          key: enums.USER.PHONE
        })
        PcCookie.delete({
          key: enums.USER.MENUS
        })
        window.location.replace('/index.html')
      }, 1000)
    } else {
      // Toast('接口请求超时，请重试！');
    }
  }
}

// 页面接口通用接口 Get
export const ajaxGet = async function (url = '', data = {}, option = {}) {
  // console.log(data)
  let params = {
    Method: 'Post',
    Route: url.split('/api/')[1],
    Para: Base64.encode(JSON.stringify({
      ...data
    }))
  }
  let baseURL = 'https://tms.hucai.com/admin/Ajax/HttpSubmission.ashx'
  if (process.env.NODE_ENV === 'development') {
    baseURL = ''
  }
  try {
    Toast.loading({
      duration: 20000
    })
    //  console.log('data||'+JSON.stringify(params))
    let result = await axios.post(`${baseURL}/api?json=${JSON.stringify(params || {})}`, params, option)
    return new Promise((resolve, reject) => {
      Toast.clear()
      if (url === '/api/Token/GetToken') {
        resolve(result.data)
      } else {
        if (typeof result.data.Data === 'string') {
          try {
            if (result.data.Data) result.data.Data = JSON.parse(result.data.Data)
          } catch (err) {
            resolve(result.data)
          }
        }
        if (!result.data.Success) {
          Toast(result.data.ResultMessage)
        }
        resolve(result.data)
      }
    })
  } catch (err) {
    Toast.clear()
    console.log({err})
    // Toast('接口请求超时，请重试！');
  }
}

// 获取TOKEN
export async function GetToken (data, option) {
  return await ajaxPost('/api/Token/GetToken', data, option)
}
// 获取短信模板
export async function GetMsgTemplateByCode (data, option) {
  return await ajaxPost('/api/MessageTemplate/GetMsgTemplateByCode', data, option)
}
// 短信写入日志
export async function MsgLog (data, option) {
  return await ajaxPost('/api/Msg/MsgLog', data, option)
}
// 发送短信
export async function SendMsg (data, option) {
  return await ajaxPost('/api/Sms/SendMsg', data, option)
}
// 用户登录
export async function Login (data, option) {
  return await ajaxPost('/api/User/Login', data, option)
}
// 用户注册
export async function Register (data, option) {
  return await ajaxPost('/api/User/Register', data, option)
}
// 获取openid
export async function getWxOpenid (data, option) {
  return await ajaxPost('/api/Wx/GetOpenId', data, option)
}
// 获取客户信息 2
export async function getCustomerInfo (data, option) {
  return await ajaxPost('/api/User/GetCustomerInfo', data, option)
}

// 获取承运商信息 1
export async function GetCarrierInfo (data, option) {
  return await ajaxPost('/api/User/GetCarrierInfo', data, option)
}

// 获取卸货点信息 3
export async function GetUnloadingPointsInfo (data, option) {
  return await ajaxPost('/api/User/GetUnloadingPointsInfo', data, option)
}

// 获取司机信息 4
export async function GetDriverInfo (data, option) {
  return await ajaxPost('/api/User/GetDriverInfo', data, option)
}

// 获取卸货点/客户列表信息
export async function GetSheetInfoByPointInCodeOrCustomerInCode (data, option) {
  // return await ajaxPost('/api/TransportSheet/GetSheetInfoByPointInCodeOrCustomerInCode', data, option)
  return await ajaxPost('/api/TransportSheet/GetSheetInfoForCustomer', data, option)
}

// 获取承运商/司机列表信息
export async function GetSheetInfoByDriverNoOrCarrierNo (data, option) {
  // return await ajaxPost('/api/TransportSheet/GetSheetInfoByDriverNoOrCarrierNo', data, option)
  return await ajaxPost('/api/TransportSheet/GetSheetList', data, option)
}

// 获取运输单轨迹列表  20
export async function GetVehicleTrackBySheetNo (data, option) {
  return await ajaxPost('/api/TransportSheet/GetVehicleTrackBySheetNo', data, option)
}
// 获取运输单卸货点列表
export async function GetPointListBySheetNo (data, option) {
  return await ajaxPost('/api/TransportSheet/GetPointListBySheetNo', data, option)
}

// 获取运输单明细信息
export async function GetSheetProductList (data, option) {
  return await ajaxPost('/api/TransportSheet/GetSheetProductList', data, option)
}

// 26、客户签收运输单货物
export async function Sign (data, option) {
  return await ajaxPost('/api/TransportSheet/TransportSheet/Sign', data, option)
}

// 获取运输单信息
export async function GetSheetList (data, option) {
  return await ajaxPost('/api/TransportSheet/GetSheetList', data, option)
}

// 获取运输单异常列表
export async function GetExceptionList (data, option) {
  return await ajaxPost('/api/Exception/GetExceptionList', data, option)
}

// 获取运输单异常详情列表
export async function GetExceptionDetail (data, option) {
  return await ajaxPost('/api/Exception/GetExceptionDetail', data, option)
}

// 保存卸货点到达信息
export async function InsertSubstates (data, option) {
  return await ajaxPost('/api/Transport/InsertSubstates', data, option)
}

// 获取产品类型信息
export async function GetBottleList (data, option) {
  return await ajaxPost('/api/BottleImg/GetBottleList', data, option)
}

// 获取运输单状态信息
export async function GetSheetStatusListBySheetNo (data, option) {
  return await ajaxPost('/api/TransportSheet/GetSheetStatusListBySheetNo', data, option)
}

// 保存运输单异常信息
export async function ExceptionInfo (data, option) {
  return await ajaxPost('/api/Exception/ExceptionInfo', data, option)
}

// 获取异常分类信息
export async function LoadAllTable (data, option) {
  return await ajaxPost('/api/DataDictionary/LoadAllTable', data, option)
}

// 保存空瓶回收信息
export async function Insert (data, option) {
  return await ajaxPost('/api/Recycle/Insert', data, option)
}

// 保存空瓶回收信息
export async function SheetSignByPointInCode (data, option) {
  return await ajaxPost('/api/TransportSheet/SheetSignByPointInCode', data, option)
}

// 获取运输单信息
export async function UpdateStatus (data, option) {
  return await ajaxPost('/api/Order/UpdateStatus', data, option)
}

// 保存空瓶回收信息
export async function GetOrdersStatusList (data, option) {
  return await ajaxPost('/api/Order/GetOrdersStatusList', data, option)
}
// 保存评论信息
export async function UpdateEvaluateBySheetNoandPoindInCode (data, option) {
  return await ajaxPost('/api/TransportList/UpdateEvaluateBySheetNoandPoindInCode', data, option)
}

// 获取运输单卸货点到达离开时间
export async function GetPointMoveTime (data, option) {
  return await ajaxPost('/api/TransportSheet/GetPointMoveTime', data, option)
}

// 获取运输单卸货点 (新接口/增加订单状态)
export async function GetSheetInfoForCustomer (data, option) {
  return await ajaxPost('/api/TransportSheet/GetSheetInfoForCustomer', data, option)
}

// 卸货点订单签收
export async function OrderSignByPoint (data, option) {
  return await ajaxPost('/api/Transport/OrderSignByPoint', data, option)
}
