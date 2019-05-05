// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/youtubeStyle'

export default class youtube extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>youtube Component</Text>
      </View>
    )
  }
}

// // Prop type warnings
// youtube.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// youtube.defaultProps = {
//   someSetting: false
// }
