import styled, { css } from 'styled-components/native'
import { SpacerProps } from '.'

export const Container = styled.View<SpacerProps>`
  ${({ height, width }) => css`
    height: ${height}px;
    width: ${width}%;
  `}
`
