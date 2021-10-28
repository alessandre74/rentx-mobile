import React from 'react'

import * as S from './styles'

type Props = {
  imageUrl: string[]
}

export function ImageSlider({ imageUrl }: Props) {
  return (
    <S.Container>
      <S.ImagineIndexes>
        <S.ImagineIndex active={true} />
        <S.ImagineIndex active={false} />
        <S.ImagineIndex active={false} />
        <S.ImagineIndex active={false} />
      </S.ImagineIndexes>

      <S.CarImageWrapper>
        <S.CarImage source={{ uri: imageUrl[0] }} resizeMode="contain" />
      </S.CarImageWrapper>
    </S.Container>
  )
}
