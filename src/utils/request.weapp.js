import { Voxios, voxiosDefaultConfig } from '@/vc-util';
import Taro from '@tarojs/taro'
import session from '@/services/session'
// import { logout, onThrowError } from '@/services/system';

const ERROR_CODE = 'code';

const wxRequest = (options = {}, config = {}, context) => {
  const { headers, ...restOptions } = options
  const { onSuccess, onError, normalizeError } = config

  return Taro.request({
    ...restOptions,
    header: headers
  }).then((res) => {
    if (typeof onSuccess === 'function') {
      return onSuccess(res, context)
    }
    return res
  }).catch((error) => {
    if (typeof onError === 'function') {
      onError(error, context)
    }
    if (typeof normalizeError === 'function') {
      throw normalizeError(error)
    }
    throw error
  })
}

const request = new Voxios()
  .setConfig({
    ...voxiosDefaultConfig,
    addAuthHeader: () => {
      return session.getAuthHeader()
    },
    request: wxRequest,
    isSuccess: (response) => {
      const { statusCode, data } = response;
      if (statusCode === 200 && data?.code == 200) {
        return true;
      }
      return false;
    },
    getErrorCode: (response) => {
      const { data = {} } = response;
      return data[ERROR_CODE];
    },
  })
  .addModule('onThrowError', (...args) => {
    // onThrowError(...args);
  })
  .getInstance();

export {
  request,
};

export default request;