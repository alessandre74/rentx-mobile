import React, { useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import useHooks from '../../Hooks'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { Spacer } from '../../components/Spacer'

import * as S from './styles'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { theme, navigation } = useHooks()

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  async function hanldeSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('A Senha é obrigatória!')
      })

      await schema.validate({ email, password })
      Alert.alert('Tudo certo')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert('Erro na autenticação')
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <S.Header>
            <S.Title>Estamos {'\n'}quase lá</S.Title>
            <S.SubTitle>Faça seu login para começar {'\n'}uma experiência incrível</S.SubTitle>
          </S.Header>

          <S.Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Spacer />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button title="Login" onPress={hanldeSignIn} enabled={true} loading={false} />

            <Spacer />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
