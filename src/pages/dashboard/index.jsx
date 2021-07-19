/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro, { getCurrentInstance, useReady, useDidShow, useDidHide, usePullDownRefresh } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { add, minus, asyncAdd } from '@/store/actions/counter'
import { user as userHttpService } from '@/services/http'
import { loginByWx, wxBindPhone } from '@/services/system'
import { cloneDeep } from '@/vc-util'
import session from '@/services/session'
import './index.less'

const Dashboard = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  // 获取路由参数
  const router = getCurrentInstance().router
  const { id } = router.params || {}

  // 可以使用所有的 React Hooks
  useEffect(() => { })

  // 对应 onReady
  useReady(() => { })

  // 对应 onShow
  useDidShow(() => { })

  // 对应 onHide
  useDidHide(() => { })

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Taro 文档】-> 【进阶指南】->【Hooks】
  usePullDownRefresh(() => { })

  const fetchUserInfo = () => {
    userHttpService.currentUser({
      data: { name: '张三', age: 20 },
    }).then(res => {
      console.log('fetchUserInfo', res)
    }).catch(err => {
      console.error('error', err)
    })
  }

  const handleGetCode = () => {
    Taro.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log('获取code', res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  const handleGetUserInfo = (e) => {
    console.log('获取用户信息', e?.detail)
  }

  const handleSystemLogin = () => {
    loginByWx().then(res => {
      console.log('登录成功', res)
    }, err => {
      console.log('err', err)
    })
  }

  const handleBindPhone = (e) => {
    console.log('获取手机信息', e?.detail)
    // 后端绑定手机号
    wxBindPhone(e).then(res => {
      console.log('wxBindPhone', res)
    }).catch(err => {
      console.log('err', err)
    })
  }

  return (
    <View className='page-dashboard'>
      <View style='padding: 20px; overflow: scroll'>counter: {counter?.num}</View>
      <AtButton className='btn' type='primary' onClick={() => dispatch(minus())}>-</AtButton>
      <AtButton className='btn' type='primary' onClick={() => dispatch(asyncAdd())}>async +</AtButton>
      <AtButton className='btn' type='primary' onClick={fetchUserInfo} >测试请求 - 获取用户</AtButton>
      <AtButton className='btn' type='primary' onClick={handleGetCode}>微信获取code</AtButton>
      <AtButton className='btn' type='primary' openType='getUserInfo' onGetUserInfo={handleGetUserInfo}>微信获取用户信息</AtButton>
      <AtButton className='btn' type='primary' onClick={handleSystemLogin}>微信code登录APP</AtButton>
      <AtButton className='btn' type='primary' openType='getPhoneNumber' onGetPhoneNumber={handleBindPhone}>APP绑定微信手机号</AtButton>
    </View>
  )
}


export default Dashboard

