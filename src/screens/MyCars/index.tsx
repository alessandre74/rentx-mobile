import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton'

import * as S from './styles'

type CarProps = {
  id: string
  user_id: string
  car: CarDTO
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const theme = useTheme()

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetCars()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {'\n'} data de início e {'\n'} fim do aluguel
        </S.Title>

        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>05</S.AppointmentsQuantity>
        </S.Appointments>
        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </S.Content>
    </S.Container>
  )
}
