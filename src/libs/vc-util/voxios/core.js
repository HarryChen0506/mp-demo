import * as axios from 'axios'
import { compile } from 'path-to-regexp'

export const transformRequestOptions = (options = {}, config = {}) => {
  const {
    url = '',
    method = 'get',
    data,
    params,
    headers,
    axiosConfig: axiosConfigFromOptions,
    wxConfig: wxConfigFromOptions,
    ...restOptions
  } = options
  const { axiosConfig: axiosConfigFromConfig, wxConfig: wxConfigFromConfig } = config
  const finalAxiosConfig = { ...axiosConfigFromConfig, ...axiosConfigFromOptions, }
  const finalWxConfig = { ...wxConfigFromConfig, ...wxConfigFromOptions, }
  let newUrl = url
  
  try {
    let domain = ''
    if (newUrl.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domain] = newUrl.match(/[a-zA-z]+:\/\/[^/]*/)
      newUrl = url.slice(domain.length)
    }
    newUrl = compile(newUrl, { encode: encodeURIComponent })(params)
    newUrl = domain + newUrl
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('voxios compile url params fail!', e, options)
  }

  const newOptions = {
    ...restOptions,
    method: method.toLowerCase(),
    headers,
    data,
  }

  if (newOptions.method === 'get') {
    newOptions.params = data
  }

  return {
    url: newUrl,
    ...newOptions,
    ...finalAxiosConfig,
    ...finalWxConfig
  }
}

export const defaultAxiosRequest = (options = {}, config = {}, context) => {
  // console.log('request option config', options, config, context)
  const { onSuccess, onError, normalizeError } = config

  if (options.method === 'get') {
    delete options.data
  }

  return axios(options)
    .then((res) => {
      const { data = {}, status } = res
      data.httpCode = status
      return res
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

export const createInstance = (config = {}, context) => (options = {}) => {
  const mergedConfig = { ...config, ...options.config }
  const { onBeforeRequest, addAuthHeader, transformHeaders } = mergedConfig
  const requestOptions = transformRequestOptions(options, mergedConfig)

  context.options = requestOptions
  context.config = mergedConfig

  if (typeof addAuthHeader === 'function') {
    requestOptions.headers = { ...requestOptions.headers, ...addAuthHeader(requestOptions.headers) }
  }

  if (typeof transformHeaders === 'function') {
    requestOptions.headers = transformHeaders(requestOptions.headers)
  }

  if (typeof onBeforeRequest === 'function') {
    onBeforeRequest(context)
  }

  if (typeof mergedConfig.request === 'function') {
    return mergedConfig.request(requestOptions, mergedConfig, context)
  }

  return defaultAxiosRequest(requestOptions, mergedConfig, context)
}
