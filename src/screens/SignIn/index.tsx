import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Spacer } from '../../components/Spacer'

import * as S from './styles'

export function SignIn() {
  const theme = useTheme()

  return (
    <S.Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <S.Header>
        <S.Title>Estamos {'\n'}quase lá</S.Title>
        <S.SubTitle>Faça seu login para começar {'\n'}uma experiência incrível</S.SubTitle>
      </S.Header>

      <S.Form>
        <Input iconName="mail" />
      </S.Form>

      <S.Footer>
        <Button title="Login" onPress={() => {}} enabled={false} loading={false} />

        <Spacer />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </S.Footer>
    </S.Container>
  )
}
