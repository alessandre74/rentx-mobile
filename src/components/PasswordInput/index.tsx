import React, { useState } from 'react'
import { Platform, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import * as S from './styles'

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const theme = useTheme()

  function handlePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <S.Container>
      <S.IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </S.IconContainer>

      <S.InputText secureTextEntry={isPasswordVisible} {...rest} />

      <S.PasswordVisibilityButton
        onPress={handlePasswordVisible}
        activeOpacity={1}
        rippleColor={theme.colors.background_secondary}
      >
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={24}
          color={theme.colors.text_detail}
        />
      </S.PasswordVisibilityButton>
    </S.Container>
  )
}
