import React from 'react'

import GasolineSvg from '../../assets/gasoline.svg'

import * as S from './styles'

type CarData = {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
  thumbnail: string
}

type Props = {
  data: CarData
}

export function Car({ data }: Props) {
  return (
    <S.Container>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`}</S.Price>
          </S.Rent>

          <S.type>
            <GasolineSvg />
          </S.type>
        </S.About>
      </S.Details>

      <S.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </S.Container>
  )
}
