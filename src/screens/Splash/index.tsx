import React from 'react'
import { Button, StyleSheet } from 'react-native'

import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import * as S from './styles'

export function Splash() {
  const animation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }]
    }
  })

  function handleAnimatationPosition() {
    animation.value += 10
  }
  return (
    <S.Container>
      <Animated.View style={[styles.box, animatedStyle]} />

      <Button title="Mover" onPress={handleAnimatationPosition} />
    </S.Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})
