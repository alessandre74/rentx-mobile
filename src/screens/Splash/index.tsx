import React from 'react'
import { Button, StyleSheet, Dimensions } from 'react-native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import * as S from './styles'

const WIDTH = Dimensions.get('window').width

export function Splash() {
  const animation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(0.73, 0.18, 0, 1.01)
          })
        }
      ]
    }
  })

  function handleAnimatationPosition() {
    animation.value = Math.random() * (WIDTH - 100)
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
