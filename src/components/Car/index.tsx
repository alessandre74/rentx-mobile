import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { CarDTO } from '../../dtos/CarDTO'
import { formatCurrency } from '../../utils/formatted'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import * as S from './styles'

interface Props extends RectButtonProps {
  data: CarDTO
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <S.Container {...rest}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{formatCurrency(data.rent.price)}</S.Price>
          </S.Rent>

          <S.type>
            <MotorIcon />
          </S.type>
        </S.About>
      </S.Details>

      <S.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </S.Container>
  )
}
