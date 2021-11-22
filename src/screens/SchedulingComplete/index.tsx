import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'

import useHooks from '../../Hooks'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import { ConfirmButton } from '../../components/ConfirmButton'

import * as S from './styles'

export function SchedulingComplete() {
  const { width } = useWindowDimensions()

  const { navigation } = useHooks()

  function handleConfirm() {
    navigation.navigate('Home')
  }
  return (
    <S.Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você só precisa ir {'\n'}até a concessionária da RENTX{'\n'}pegar o seu automóvel
        </S.Message>

        <S.Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </S.Footer>
      </S.Content>
    </S.Container>
  )
}
