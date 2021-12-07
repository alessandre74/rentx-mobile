import React from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar } from 'react-native'

import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

import useHooks from '../../Hooks/useHooks'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'
import { CarDTO } from '../../dtos/CarDTO'

import { formatCurrency } from '../../utils/formatted'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import * as S from './styles'

type Params = {
  car: CarDTO
}

export function CarDetails() {
  const { route, navigation } = useHooks()
  const { car } = route.params as Params

  const statusBarHeight = getStatusBarHeight()

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, statusBarHeight + 50], Extrapolate.CLAMP)
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  function handleBack() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  return (
    <S.Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <S.AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <S.Header>
          <BackButton onPress={handleBack} />
        </S.Header>

        <S.AnimatedCarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </S.AnimatedCarImages>
      </S.AnimatedHeaderAndSlider>

      <S.AnimatedContent onScroll={scrollHandler} scrollEventThrottle={16}>
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
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Accessories>
        <S.About>{car.about}</S.About>
      </S.AnimatedContent>

      <S.Footer>
        <Button title="Escolher período de aluguel" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
