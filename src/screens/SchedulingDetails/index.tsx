import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { formatCurrency } from '../../utils/formatted'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformdate'

import * as S from './styles'

type Params = {
  car: CarDTO
  dates: string[]
}

type RentalPeriod = {
  start: string
  end: string
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * car.rent.price)

  function handleBack() {
    navigation.goBack()
  }

  async function handleConfirmRental() {
    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [...schedulesByCar.data.unavailable_dates, ...dates]

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigation.navigate('SchedulingComplete')
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento.')
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} color="blue" />
      </S.Header>

      <S.CarImages>
        <ImageSlider imageUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>{formatCurrency(car.rent.price)}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map(acessory => (
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentaPriceLabel>TOTAL</S.RentaPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              {`${formatCurrency(car.rent.price)} x${dates.length} diárias`}
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>{formatCurrency(rentTotal)}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button title="Aluga agora" color={theme.colors.success} onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
