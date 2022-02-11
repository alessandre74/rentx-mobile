import styled, { css } from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled(BorderlessButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors.line};
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 36px;
    width: 36px;
    left: 170px;
    top: 60px;
    border-radius: 18px;
    box-shadow: 0 0 4px ${theme.colors.text_detail};
  `}
`
