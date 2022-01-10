import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

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
  const { user } = useAuth()
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driveLicense, setDriveLicense] = useState(user.driver_license)

  const { theme, navigation } = useHooks()

  function handleBack() {
    navigation.goBack()
  }
  function handleSignOut() {}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected)
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>
            <S.PhotoContainer>
              {!!avatar && <S.Photo source={{ uri: avatar }} />}
              <S.PhotoButton onPress={handleAvatarSelect}>
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
                  onChangeText={setName}
                />

                <Spacer />

                <Input iconName="mail" editable={false} defaultValue={user.email} />

                <Spacer />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriveLicense}
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
