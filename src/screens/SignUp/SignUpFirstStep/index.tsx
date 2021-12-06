import React from 'react'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'

import useHooks from '../../../Hooks'
import * as S from './styles'

export function SignUp() {
  const { navigation } = useHooks()

  function handleBack() {
    navigation.goBack()
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} />
        <S.Steps>
          <Bullet active={false} />
          <Bullet active />
        </S.Steps>
      </S.Header>

      <S.Title>Crie sua{'\n'}conta</S.Title>

      <S.SubTitle>
        Faça seu cadastro de{'\n'}
        forma rápida e fácil
      </S.SubTitle>

      <S.Form>
        <S.FormTitle>1.Dados</S.FormTitle>
      </S.Form>
    </S.Container>
  )
}
