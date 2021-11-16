import React from 'react'
import { FlatList } from 'react-native'

import * as S from './styles'

type Props = {
  imagesUrl: string[]
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <S.Container>
      <S.ImagineIndexes>
        {imagesUrl.map((_, index) => (
          <S.ImagineIndex key={String(index)} active={true} />
        ))}
      </S.ImagineIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage source={{ uri: item }} resizeMode="contain" />
          </S.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </S.Container>
  )
}
