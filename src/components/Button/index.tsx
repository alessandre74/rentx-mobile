import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'
import * as S from './styles'

interface Props extends RectButtonProps {
  title: string
  color?: string
  loading?: boolean
}

export function Button({ title, color, enabled = true, loading = false, ...rest }: Props) {
  const theme = useTheme()
  return (
    <S.Container
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <S.Title>{title}</S.Title>}
    </S.Container>
  )
}
