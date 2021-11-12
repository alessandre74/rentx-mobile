import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, DayProps, generateIntervals, MarkedDateProps } from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles'

export function Scheduling() {
  const [lastSelectdate, setLastSelectdate] = useState<DayProps>({} as DayProps)
  const [makedDates, setMakedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const theme = useTheme()
  const nagivation = useNavigation()

  function handleBack() {
    nagivation.goBack()
  }

  function handleConfirmRental() {
    nagivation.navigate('SchedulingDetails')
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectdate.timestamp ? date : lastSelectdate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectdate(end)
    const interval = generateIntervals(start, end)
    setMakedDates(interval)
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

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
        <Calendar markedDates={makedDates} onDayPress={handleChangeDate} />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
