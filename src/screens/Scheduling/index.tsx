import React from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles'

export function Scheduling() {
  const theme = useTheme()
  const nagivation = useNavigation()

  function handleCarDetails() {
    nagivation.navigate('CarDetails')
  }

  function handleConfirmRental() {
    nagivation.navigate('SchedulingDetails')
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={handleCarDetails} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {'\n'} data de início e {'\n'} fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>

            <S.DateValueContainer selected={false}>
              <S.DateValue>18/06/2021</S.DateValue>
            </S.DateValueContainer>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>

            <S.DateValueContainer selected={false}>
              <S.DateValue>18/06/2021</S.DateValue>
            </S.DateValueContainer>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
