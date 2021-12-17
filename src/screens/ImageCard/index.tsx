import React from 'react'

import { ImageSlider } from '../../components/ImageSlider'

import * as S from './styles'

type ImageProp = {
  photos: {
    id: string
    photo: string
  }[]
}

const imageURL: ImageProp = {
  photos: [
    {
      id: '1',
      photo: 'https://avatars.githubusercontent.com/u/65136543?v=4'
    },
    {
      id: '2',
      photo: 'https://avatars.githubusercontent.com/u/65136543?v=4'
    },
    {
      id: '3',
      photo: 'https://avatars.githubusercontent.com/u/65136543?v=4'
    }
  ]
}

export function ImageCard() {
  return <S.Container>{<ImageSlider imagesUrl={imageURL.photos} />}</S.Container>
}
