import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import DateHeader from './DateHeader'
import UdaciSlider from './UdaciSlider'
import UdaciSteper from './UdaciSteper'

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
)

const getInitialState = () => ({
  run: 0,
  bike: 0,
  swin: 0,
  sleep: 0,
  eat: 0,
})

export default class AddEntry extends React.Component {

  state = getInitialState()



  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] + getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  onSubmit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(getInitialState())
    // Update Redux

    // Navigate to home

    // Save on db

    // Clear local notification
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ?
                <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest} /> :
                <UdaciSteper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest} />}
            </View>
          )
        })}
        <SubmitButton onPress={this.onSubmit} />
      </View>
    )
  }
}
