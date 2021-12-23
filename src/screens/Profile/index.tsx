import React from 'react'
import { StatusBar } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'
import useHooks from '../../Hooks/useHooks'

import mike from '../../assets/mike.png'
import * as S from './styles'

export function Profile() {
  const { theme, navigation } = useHooks()

  function handleBack() {
    navigation.goBack()
  }
  function handleSinOut() {}

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
          <S.LogoutButton onPress={handleSinOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </S.LogoutButton>
        </S.HeaderTop>
        <S.PhotoContainer>
          <S.Photo
            source={{
              uri: 'https://user-images.githubusercontent.com/52423583/147198602-6aeb6e3c-ae7c-42bd-a422-d5e95e9a1fde.png'
            }}
          />
          <S.PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </S.PhotoButton>
        </S.PhotoContainer>
      </S.Header>
    </S.Container>
  )
}
