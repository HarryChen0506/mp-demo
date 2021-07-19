
import Taro from '@tarojs/taro'

export const localStorage = {
  save(key, value) {
    return Taro.setStorageSync(key, value)
  },
  get(key) {
    return Taro.getStorageSync(key)
  },
  remove(key) {
    return Taro.removeStorageSync(key)
  },
  canSupport() {
    return Taro && Taro.getStorageSync
  }
}

export const sessionStorage = localStorage

const global = {}

export const globalStorage = {
  save: function (key, value) {
    return global[key] = value
  },
  get: function (key) {
    return global[key]
  },
  remove: function (key) {
    return delete global[key]
  },
  getState: function () {
    return global
  },
  canSupport() {
    return true
  },
}

export const getStorage = () => {
  return [localStorage, sessionStorage, globalStorage].find(v => {
    return typeof v.canSupport === 'function' && v.canSupport()
  })
}

