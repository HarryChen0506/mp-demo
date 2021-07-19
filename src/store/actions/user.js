import { user } from '@/services/http'
// import Session from '@/services/session'
// import systemService from '@/services/system'
import { LOAD_USER_DATA, CLEAR_USER_DATA } from '../constants/user'

export const loadUserData = (data = {}) => {
  return {
    type: LOAD_USER_DATA,
    payload: data
  }
}

export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA
  }
}

// h5手动登录
export function loginWeb(data, sucNext, failNext) {
  return dispatch => {
    user.loginWeb(data).then((res) => {
      const { token = '', refreshToken = '', ...rest } = (res && res.result && res.result.data) || {}
      const payload = {
        login: true,
        token,
        refreshToken,
        ...rest
      }
      dispatch(loadUserData(payload))
      // Session.saveSession(token, refreshToken)
      typeof sucNext === 'function' && sucNext(res)
    }).catch(err => {
      typeof failNext === 'function' && failNext(err)
    })
  }
}

// 自动登录 by token
export function autoLogin(data, sucNext, failNext) {
  return dispatch => {
    user.currentUser(data).then((res) => {
      const { token = '', refreshToken = '', ...rest } = (res && res.result && res.result.data) || {}
      const payload = {
        login: true,
        token,
        refreshToken,
        ...rest
      }
      dispatch(loadUserData(payload))
      // Session.saveSession(token, refreshToken)
      typeof sucNext === 'function' && sucNext(res)
    }).catch(err => {
      typeof failNext === 'function' && failNext(err)
    })
  }
}

// wx静默登录 by wxcode
export function forceLogin(data, sucNext, failNext) {
  return dispatch => {
    // systemService.loginByWx(data).then((res) => {
    //   const { token = '', refreshToken = '', ...rest } = (res && res.result && res.result.data) || {}
    //   const payload = {
    //     login: true,
    //     token,
    //     refreshToken,
    //     ...rest
    //   }
    //   dispatch(loadUserData(payload))
    //   Session.saveSession(token, refreshToken)
    //   typeof sucNext === 'function' && sucNext(res)
    // }).catch(err => {
    //   typeof failNext === 'function' && failNext(err)
    // })
  }
}

// wx 绑定手机号 
export function bindPhone(event, sucNext, failNext) {
  return dispatch => {
    // systemService.wxBindMobile(event).then(res => {
    //   const { token = '', refreshToken = '', ...rest } = (res && res.result && res.result.data) || {}
    //   const payload = {
    //     login: true,
    //     token,
    //     refreshToken,
    //     ...rest
    //   }
    //   dispatch(loadUserData(payload))
    //   Session.saveSession(token, refreshToken)
    //   typeof sucNext === 'function' && sucNext(res)
    // }, err => {
    //   typeof failNext === 'function' && failNext(err)
    // })
  }
}

// h5 注册
export function registerWeb(data, sucNext, failNext) {
  return dispatch => {
    // user.registerWeb(data).then((res) => {
    //   const { token = '', refreshToken = '', ...rest } = (res && res.result && res.result.data) || {}
    //   const payload = {
    //     login: true,
    //     token,
    //     refreshToken,
    //     ...rest
    //   }
    //   dispatch(loadUserData(payload))
    //   Session.saveSession(token, refreshToken)
    //   typeof sucNext === 'function' && sucNext(res)
    // }).catch(err => {
    //   typeof failNext === 'function' && failNext(err)
    // })
  }
}


//退出
export function logout(sucNext) {
  return dispatch => {
    dispatch(clearUserData())
    // Session.clearSession()
    typeof sucNext === 'function' && sucNext()
  }
}
