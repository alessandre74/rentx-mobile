import React from 'react'
import { StatusBar } from 'react-native'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import * as S from './styles'

export function CarDetails() {
  return (
    <S.Container>
      {/* <StatusBar barStyle="light-content" /> */}
      <S.Header>
        <BackButton onPress={() => {}} color="blue" />
      </S.Header>

      <S.CarImages>
        <ImageSlider imageUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </S.CarImages>
    </S.Container>
  )
}
