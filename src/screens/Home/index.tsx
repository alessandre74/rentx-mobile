import React from 'react'
import { View } from 'react-native'
import * as S from './styles'

export function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <S.Container>
        <S.Title>Home</S.Title>
      </S.Container>
    </View>
  )
}
