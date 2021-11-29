import React from 'react'
import * as S from './styles'

export type SpacerProps = {
  height?: number
  width?: number
}

export function Spacer({ height = 8, width = 100 }: SpacerProps) {
  return <S.Container height={height} width={width} />
}
