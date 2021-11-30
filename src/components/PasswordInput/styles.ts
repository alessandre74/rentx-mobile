import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { BorderlessButton } from 'react-native-gesture-handler'

type ContainerProps = {
  isFocused: boolean
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`

export const IconContainer = styled.View`
  ${({ theme }) => css`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${theme.colors.background_secondary};
  `}
`
export const InputText = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    padding: 0 23px;
    color: ${theme.colors.text};
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.primary_400};
    background-color: ${theme.colors.background_secondary};
  `}
`
export const PasswordVisibilityButton = styled(BorderlessButton)`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    padding: 0 16px 0 16px;
    background-color: ${theme.colors.background_secondary};
  `}
`
