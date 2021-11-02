import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import * as S from './styles'

type Props = {
  title: string
  color?: string
}

export function Button({ title, color, ...rest }: Props) {
  return (
    <S.Container {...rest} color={color}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
