import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { MyCars } from '../screens/MyCars'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { CarDTO } from '../dtos/CarDTO'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      CarDetails: { car: CarDTO }
      MyCars: undefined
      Scheduling: { car: CarDTO }
      SchedulingDetails: { car: CarDTO; dates: string[] }
      SchedulingComplete: undefined
    }
  }
}

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  )
}
