import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AnimatedIntro = () => {
  return (
    <View style={styles.wrapper}>
      <Text>AnimatedIntro</Text>
    </View>
  )
}

export default AnimatedIntro

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
})