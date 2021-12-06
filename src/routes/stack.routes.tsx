import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { CarDTO } from '../dtos/CarDTO'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp/SignUpFirstStep/index'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignUp: undefined
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
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}
