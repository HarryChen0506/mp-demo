import * as qs from 'qs'

// const STATUS_CODE = 'status'
const ERROR_CODE = 'error_code'


const defaultConfig = {
  addAuthHeader: () => ({}),
  transformHeaders: headers => headers,
  axiosConfig: {
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
  wxConfig: {},
  isSuccess: (response) => {
    const { status } = response
    if (status === 200) {
      return true
    }
    return false
  },
  getErrorCode: (response) => {
    const { data = {} } = response
    return data[ERROR_CODE]
  },
  onBeforeRequest: () => { },
  onSuccess: (res, context) => {
    const { options, config } = context
    const isSuccess = options?.config?.isSuccess || config?.isSuccess
    const getErrorCode = options?.config?.getErrorCode || config?.getErrorCode
    const { data = {} } = res

    if ((typeof isSuccess === 'function' && isSuccess(res)) || isSuccess === true) {
      data.statusText = 'OK'
      return data
    }

    const error = {
      code: typeof getErrorCode === 'function' && getErrorCode(res),
      message: data.message || data.msg || data.errmsg,
      data,
      origin: res,
    }

    return Promise.reject(error)
  },
  onError: (error, context) => {
    const { options, config } = context
    const showErrorMessage = Boolean(options?.config?.throwErrorMessage || config?.throwErrorMessage)
    const normalizeError = options?.config?.normalizeError || config?.normalizeError
    let threwError = error
    let messageText = ''

    if (typeof error === 'string') {
      messageText = '操作失败，请稍后重试！'
    } else if (typeof error === 'object' && error !== null && error.response) {
      const { response } = error
      if (response && response.status) {
        const errorText = response.statusText
        const { status, data } = response
        // eslint-disable-next-line no-console
        console.error(`axios threw error detail: ${status} ${data.path}`, errorText, error)
      }
      messageText = '操作失败，请稍后重试!'
      if (typeof normalizeError === 'function') {
        threwError = normalizeError(error)
      }
    }
    messageText = messageText || '您的网络发生异常，无法连接服务器'
    if (showErrorMessage) {
      // eslint-disable-next-line no-console
      console.error('voxios threw http error detail: ', threwError, messageText)
      const onThrowError = context.getModule('onThrowError')
      typeof onThrowError === 'function' && onThrowError(threwError)
    }
  },
  normalizeError: (error) => {
    if (!error || !error.response) {
      return error
    }
    const { response } = error
    let { data, status } = response
    if (typeof data === 'string') {
      data = { data }
    }
    return {
      code: data[ERROR_CODE],
      message: data.message,
      data: {
        ...data,
        httpCode: status
      },
      origin: response,
      error: error
    }
  }
}

export default defaultConfig
