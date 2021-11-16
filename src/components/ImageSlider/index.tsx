import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'

import * as S from './styles'

type Props = {
  imagesUrl: string[]
}

type ChangeImageProps = {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <S.Container>
      <S.ImagineIndexes>
        {imagesUrl.map((_, index) => (
          <S.ImagineIndex key={String(index)} active={index === imageIndex} />
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
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  )
}
