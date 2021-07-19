// http服务
import { request } from '@/utils/request'
import { path } from './api_config'

export const user = {
  login(data) {
    return request({
      url: path.user.login,
      method: 'post',
      data,
    })
  },
  bindMobile(data) {
    return request({
      url: path.user.bindMobile,
      method: 'post',
      data,
    })
  },
  currentUser(data) {
    return request({
      url: path.user.currentUser,
      method: 'get',
      data,
    })
  },
}

export const core = {
  getIntentionByUserId(params, data) {
    return request({
      url: path.core.intentionByUserId,
      method: 'get',
      params: params,
      data: data,
    })
  },
  addIntention(data) {
    return request({
      url: path.core.addIntention,
      method: 'post',
      data: data,
    })
  },
  updateIntention(data) {
    return request({
      url: path.core.updateIntention,
      method: 'post',
      data: data,
    })
  },
  updateIntentionStatus(data) {
    return request({
      url: path.core.updateIntentionStatus,
      method: 'post',
      data: data,
    })
  },
  getResumeByUserId(params, data) {
    return request({
      url: path.core.resumeByUserId,
      method: 'get',
      params: params,
      data: data,
    })
  },
  addResumeBasic(data) {
    return request({
      url: path.core.addResumeBasic,
      method: 'post',
      data: data,
    })
  },
  updateResumeBasic(data) {
    return request({
      url: path.core.updateResumeBasic,
      method: 'post',
      data: data,
    })
  },
  addResumeWork(data) {
    return request({
      url: path.core.addResumeWork,
      method: 'post',
      data: data,
    })
  },
  updateResumeWork(data) {
    return request({
      url: path.core.updateResumeWork,
      method: 'post',
      data: data,
    })
  },
  deleteResumeWork(params) {
    return request({
      url: path.core.deleteResumeWork,
      method: 'delete',
      params: params,
    })
  },
  addResumeEducation(data) {
    return request({
      url: path.core.addResumeEducation,
      method: 'post',
      data: data,
    })
  },
  updateResumeEducation(data) {
    return request({
      url: path.core.updateResumeEducation,
      method: 'post',
      data: data,
    })
  },
  deleteResumeEducation(params) {
    return request({
      url: path.core.deleteResumeEducation,
      method: 'delete',
      params: params,
    })
  },
  updateResumeHomeUrl(data) {
    return request({
      url: path.core.updateResumeHomeUrl,
      method: 'post',
      data: data,
    })
  },
  updateResumeProfile(data) {
    return request({
      url: path.core.updateResumeProfile,
      method: 'post',
      data: data,
    })
  },
  queryHomePagePositionList(data) {
    return request({
      url: path.core.queryHomePagePositionList,
      method: 'post',
      data: data,
    })
  },
  queryPositionList(data) {
    return request({
      url: path.core.queryPositionList,
      method: 'post',
      data: data,
    })
  },
  queryPositionInfoById(params) {
    return request({
      url: path.core.queryPositionInfoById,
      method: 'get',
      params: params,
    })
  },
  queryUserPositionInfo(params) {
    return request({
      url: path.core.queryUserPositionInfo,
      method: 'get',
      params: params,
    })
  },
  queryUserCompanyInfo(params) {
    return request({
      url: path.core.queryUserCompanyInfo,
      method: 'get',
      params: params,
    })
  },
  queryHotPositionList(data) {
    return request({
      url: path.core.queryHotPositionList,
      method: 'get',
      data: data,
    })
  },
  deliveryPosition(data) {
    return request({
      url: path.core.deliveryPosition,
      method: 'post',
      data: data,
    })
  },
  favoritePosition(data) {
    return request({
      url: path.core.favoritePosition,
      method: 'post',
      data: data,
    })
  },
  deleteFavoritePosition(params) {
    return request({
      url: path.core.deleteFavoritePosition,
      method: 'delete',
      params: params,
    })
  },
  queryFavoritePositions(data) {
    return request({
      url: path.core.queryFavoritePositions,
      method: 'get',
      data: data,
    })
  },
  queryDeliveryPositions(data) {
    return request({
      url: path.core.queryDeliveryPositions,
      method: 'get',
      data: data,
    })
  },
  queryViewedDeliveryPositions(data) {
    return request({
      url: path.core.queryViewedDeliveryPositions,
      method: 'get',
      data: data,
    })
  },
  queryMessages(data) {
    return request({
      url: path.core.queryMessages,
      method: 'get',
      data: data,
    })
  },
  queryUnreadMessages(data) {
    return request({
      url: path.core.queryUnreadMessages,
      method: 'get',
      data: data,
    })
  },
}

export const common = {
  ossGetSignature(data) {
    return request({
      url: path.common.ossGetSignature,
      method: 'get',
      data,
    })
  },
  loginAuthCode(data) {
    return request({
      url: path.common.verifyCode,
      method: 'post',
      data,
    })
  },
  shareCodeImage(data) {
    return request({
      url: path.common.shareCodeImage,
      method: 'get',
      data,
    })
  },
}

export default {
  user,
  core,
  common
}
