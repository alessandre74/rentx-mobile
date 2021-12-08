import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { formatCurrency } from '../../utils/formatted'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformdate'

import useHooks from '../../Hooks/useHooks'

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
  const [loading, setLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const { route, navigation, theme } = useHooks()
  const { car, dates } = route.params as Params

  const start = format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')
  const end = format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')

  const rentTotal = Number(dates.length * car.price)

  function handleBack() {
    navigation.goBack()
  }

  async function handleConfirmRental() {
    try {
      setLoading(true)
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [...schedulesByCar.data.unavailable_dates, ...dates]

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: start,
        endDate: end
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      })

      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro Alugado',
        message: `Agora você só precisa ir \naté a concessionária da RENTX \npegar o seu automóvel.`
      })
    } catch (error) {
      setLoading(false)
      Alert.alert('Não foi possível confirmar o agendamento.')
    }
  }

  useEffect(() => {
    setRentalPeriod({ start, end })
  }, [])

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} color="blue" />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>{formatCurrency(car.price)}</S.Price>
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
              {`${formatCurrency(car.price)} x${dates.length} ${
                dates.length === 1 ? 'diária' : 'diárias'
              }`}
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>{formatCurrency(rentTotal)}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Aluga agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  )
}
