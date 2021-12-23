import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import useHooks from '../../Hooks/useHooks'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import { Car } from '../../components/Car'
import { BackButton } from '../../components/BackButton'
import { LoadAnimation } from '../../components/LoadAnimation'

import * as S from './styles'

type CarProps = {
  id: string
  user_id: string
  startDate: string
  endDate: string
  car: CarDTO
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const { navigation, theme } = useHooks()

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
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <S.Header>
        <S.HeaderBackButton>
          <BackButton onPress={handleBack} color={theme.colors.shape} />
        </S.HeaderBackButton>

        <S.TextWrapper>
          <S.Title>Seus agendamentos, {'\n'}estão aqui.</S.Title>
          <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
        </S.TextWrapper>
      </S.Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
          </S.Appointments>
          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />

                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  )
}
