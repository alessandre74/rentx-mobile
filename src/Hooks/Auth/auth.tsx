import React, { createContext, useState, useContext, useEffect } from 'react'
import { AuthContextData, AuthProviderProps, User, SignInCredencials } from './types'

import { api } from '../../services/api'
import { database } from '../../database'
import { User as ModelUser } from '../../database/model/User'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User)

  async function signIn({ email, password }: SignInCredencials) {
    try {
      const response = await api.post('/sessions', { email, password })

      const { token, user } = response.data

      api.defaults.headers.common['authorization'] = `Bearer ${token}`

      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        await userCollection.create(newUser => {
          ;(newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.driver_license = user.driver_license),
            (newUser.avatar = user.avatar),
            (newUser.token = token)
        })
      })

      setData({ ...user })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserdata() {
      const userColletion = database.get<ModelUser>('users')
      const response = await userColletion.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User
        api.defaults.headers.common['authorization'] = `Bearer ${userData.token}`
        setData(userData)
      }
    }
    loadUserdata()
  }, [])
  return <AuthContext.Provider value={{ user: data, signIn }}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
