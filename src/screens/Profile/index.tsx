import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import useHooks from '../../Hooks/useHooks'

import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Spacer } from '../../components/Spacer'

import * as S from './styles'
import { useAuth } from '../../Hooks/Auth/auth'

KeyboardAvoidingView
export function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

  const { user } = useAuth()
  const { theme, navigation } = useHooks()

  function handleBack() {
    navigation.goBack()
  }
  function handleSinOut() {}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected)
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <S.Photo source={require('../../assets/mike.png')} />
              <S.PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <S.OptionTitle active={option === 'dataEdit'}>Dados</S.OptionTitle>
              </S.Option>
              <S.Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>Trocar senha</S.OptionTitle>
              </S.Option>
            </S.Options>

            {option === 'dataEdit' ? (
              <S.Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Spacer />
                <Input iconName="mail" editable={false} defaultValue={user.email} />
                <Spacer />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </S.Section>
            ) : (
              <S.Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <Spacer />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <Spacer />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </S.Section>
            )}
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
