import React from 'react'
import * as S from './styles'

export type SpacerProps = {
  height?: number
  width?: number
}

export function Spacer({ height, width }: SpacerProps) {
  return <S.Container height={height} width={width} />
}
