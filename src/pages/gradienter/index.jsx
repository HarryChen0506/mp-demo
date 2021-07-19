/* eslint-disable no-unused-vars */
import { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({

}))
class Gradienter extends Component {

  state = {
    // data: {},
    rotateXY: 0,
    degreesXY: 0,
    rotateYZ: 0,
    rotateZX: 0,
  }

  componentDidMount() {
    Taro.onAccelerometerChange(res => {
      // console.log(res.x)
      // console.log(res.y)
      // console.log(res.z)
      var rotateXY = Math.atan2(res.x, res.y) * 180 / Math.PI
      var rotateYZ = Math.atan2(res.y, res.z) * 180 / Math.PI
      var rotateZX = Math.atan2(res.z, res.x) * 180 / Math.PI
      let degreesXY = 0

      if (rotateXY < 0) {
        degreesXY = (rotateXY + 180).toFixed(2)
      } else {
        degreesXY = -(180 - rotateXY).toFixed(2)
      }
      let degreesYZ = 0
      if (rotateYZ < 0) {
        degreesYZ = (rotateYZ + 180).toFixed(2)
      } else {
        degreesYZ = -(180 - rotateYZ).toFixed(2)
      }

      this.setState({
        rotateXY: rotateXY,
        rotateYZ: rotateYZ,
        rotateZX: rotateZX,
        degreesXY,
        degreesYZ
      })

    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  calcDegree = (value) => {
    // const degree = Math.abs(value - 90)
    return new Number(value).toFixed(0)
  }

  render() {
    const { degreesXY, degreesYZ, rotateXY, rotateYZ, rotateZX } = this.state
    const degYZ = this.calcDegree(degreesYZ)
    return (
      <View className='page-gradienter'>
        <View className='title'><Text>水平仪</Text></View>
        <View className='result'><Text>{degYZ} 度</Text></View>
        {/* <View className='result'>degreeXY: <Text>{degreesXY} 度</Text></View>
        <View className='result'>degreeYZ: <Text>{degreesYZ} 度</Text></View>
        <View className='result'>rotateXY: <Text>{rotateXY} </Text></View>
        <View className='result'>rotateYZ: <Text>{rotateYZ} </Text></View>
        <View className='result'>rotateZX: <Text>{rotateZX} </Text></View> */}
      </View>
    )
  }
}

export default Gradienter

