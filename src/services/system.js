// 系统服务， 包括用户注册登录
import Taro from '@tarojs/taro';
import { user as userHttpService } from './http'
import { appId } from './config'

// 通过微信code登录
export const loginByWx = async function () {
  const codeRes = await Taro.login()
  return userHttpService.login({
    appId,
    wxcode: codeRes.code
  })
}

// const data = {
//   avatar: null,
//   bindMobile: false,
//   enterpriseId: null,
//   openId: "o83IH5tLY3mVuCgL-wSBBCKAxsnI",
//   token: "7d48c7b22699475e95e1a544b26a9d61",
//   userId: "o83IH5tLY3mVuCgL-wSBBCKAxsnI",
//   username: "",
// }

// 绑定微信的手机号
export const wxBindPhone = async function (event = {}) {
  console.log('wx BindPhone event', event)
  const { detail } = event
  const codeRes = await Taro.login()
  console.log('wx code', codeRes)
  const loginRes = await userHttpService.login({
    appId,
    wxcode: codeRes.code
  })
  console.log('login result', loginRes.result)
  const postData = {
    "encryptedData": detail.encryptedData,
    "iv": detail.iv,
    // 'signature': detail.signature,
    "appId": appId,
    "openId": loginRes.result.data.openId,
    "wxcode": codeRes.code,
  }
  return userHttpService.bindMobile(postData)
}

const system = {
  loginByWx,
  wxBindPhone
}

export default system