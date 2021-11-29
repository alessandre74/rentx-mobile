import styled, { css } from 'styled-components/native'
import { SpacerProps } from '.'

export const Container = styled.View<SpacerProps>`
  ${({ height, width }) => css`
    height: ${height ? height : 8}px;
    width: ${width ? width : 100}%;
  `}
`
