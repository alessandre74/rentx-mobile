import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../Hooks/Auth/auth'

import { AppTabRoutes } from './app.tab.routes'
import { AuthRoutes } from './auth.routes'

import { Car } from '../database/model/Car'
import { CarDTO } from '../dtos/CarDTO'
import { UserDTO } from '../dtos/userDTO'
import { ScreenDTO } from '../dtos/ScreenDTO'
import { LoadAnimation } from '../components/LoadAnimation'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined
      SignIn: undefined
      SignUpFirstStep: undefined
      SignUpSecondStep: UserDTO
      Home_: undefined
      CarDetails: { car: Car }
      Scheduling: { car: CarDTO }
      SchedulingDetails: { car: CarDTO; dates: string[] }
      Confirmation: ScreenDTO
      MyCars: undefined
    }
  }
}

export function Routes() {
  const { user, loading } = useAuth()

  return loading && !user ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>{user.id ? <AppTabRoutes /> : <AuthRoutes />}</NavigationContainer>
  )
}
