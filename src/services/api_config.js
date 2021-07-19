// host域名管理
import { ENV, TARO_ENV } from './config'

// https://api.ibrandstar.com

const host = {
  miniapi: {
    dev: 'https://api.starjob.cn',
    prod: 'https://api.starjob.cn'
  },
  request: {
    dev: 'https://api.starjob.cn',
    prod: 'https://api.starjob.cn'
  },
  // upload: {
  //   dev: 'https://abc.xxx.com',
  //   prod: 'https://abc.xxx.com'
  // },
  // download: {
  //   dev: 'https://abc.xxx.com',
  //   prod: 'https://abc.xxx.com'
  // }
}

const WX_PROD_API = ''
const H5_PROD_API = '/api'


// 计算域名 
function calcHost(taroEnv = 'weapp', type = 'request', env = 'prod') {
  if (taroEnv === 'weapp') {
    return host[type][env]
  } else if (taroEnv === 'h5') {
    return ''
  }
}

// 获取域名
function getHost(type = 'request') {
  return calcHost(TARO_ENV, type, ENV)
}


// const isDevEnv = () => {
//   return REACT_APP_ENV === 'dev'
// }

const calcApiPrefix = () => {
  if (TARO_ENV === 'weapp') {
    return WX_PROD_API
  } else if (TARO_ENV === 'h5') {
    return H5_PROD_API
  }
  return ''
}
export const path = {
  user: {
    loginWeb: `${getHost()}${calcApiPrefix()}/pub/v1/login_by_cellphone`,
    registerWeb: `${getHost()}${calcApiPrefix()}/pub/v1/register_by_cellphone`,
    login: `${getHost()}${calcApiPrefix()}/pub/v1/login_by_wxmini`,
    bindMobile: `${getHost()}${calcApiPrefix()}/pub/v1/user_bind_wx`,
    currentUser: `${getHost()}${calcApiPrefix()}/user/v1/get_user_info`,
  },
  core: {
    intentionByUserId: `${getHost()}${calcApiPrefix()}/user/v1/getUseResumeIntentionByUserId/:userId`,
  },
  common: {
    ossGetSignature: `${getHost()}${calcApiPrefix()}/pub/v1/oss/get_signature`,
    verifyCode: `${getHost()}${calcApiPrefix()}/pub/v1/send_sms_verify_code`,
    shareCodeImage: `${getHost()}${calcApiPrefix()}/pub/v1/miniapp/get_wxacode`,
  }
}
export const api = {
  name: 'api-config',
  API: calcApiPrefix(),
  path
}
export default api

