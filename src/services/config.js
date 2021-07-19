// 配置文件
import projectConfig from '@/project'

export const ENV = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
// export const ENV = 'prod'  // 'prod' 生产
// export const ENV = 'dev'  // 'dev' 开发
export const TARO_ENV = process.env.TARO_ENV // h5  weapp
export const appId = projectConfig.appid
export const appName = projectConfig.projectname || '星球招聘'
export const appConfig = {
  image_oss_postfix: '?x-oss-process=image/resize,h_748,w_560',
}
export default {
  ENV,
  TARO_ENV,
  appId: appId,
  appName,
  appConfig: appConfig
}