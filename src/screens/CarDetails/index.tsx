import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'
import { CarDTO } from '../../dtos/CarDTO'
import { formatCurrency } from '../../utils/formatted'

import * as S from './styles'

type Params = {
  car: CarDTO
}

export function CarDetails() {
  const nagivation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params

  function handleBack() {
    nagivation.goBack()
  }

  function handleConfirmRental() {
    nagivation.navigate('Scheduling')
  }

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
          {car.accessories.map(accessory => (
            <Accessory key={accessory.type} name={accessory.name} icon={speedSvg} />
          ))}
        </S.Accessories>

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período de aluguel" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
