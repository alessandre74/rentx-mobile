import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${theme.colors.background_primary};
  `}
`
export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: 30px;
    font-family: ${theme.fonts.secondary_600};
  `}
`
