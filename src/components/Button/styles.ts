import styled, { css } from 'styled-components/native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

interface ButtonProps extends RectButtonProps {
  color?: string
}

type ButtonTextProps = {
  light: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  ${({ theme, color }) => css`
    width: 100%;
    padding: 19px;

    justify-content: center;
    align-items: center;

    background-color: ${color ? color : theme.colors.main};
  `}
`
export const Title = styled.Text<ButtonTextProps>`
  ${({ theme, light }) => css`
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${light ? theme.colors.header : theme.colors.shape};
  `}
`
