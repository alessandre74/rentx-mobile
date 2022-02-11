import React from 'react'
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import * as S from './styles'

interface Props extends BorderlessButtonProps {
  status: boolean | null
  size: number
  color?: string
}

export function AirplaneMode({ status, size, color, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <Ionicons
        name={status === true ? 'airplane' : 'airplane-outline'}
        size={size}
        color={color}
      />
    </S.Container>
  )
}
