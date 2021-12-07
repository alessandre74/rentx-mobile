import React, { createContext, useState, useContext } from 'react'
import { AuthContextData, AuthProviderProps, AuthState, SignInCredencials } from './types'

import { api } from '../../services/api'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState)

  async function signIn({ email, password }: SignInCredencials) {
    const response = await api.post('/sessions', { email, password })

    const { token, user } = response.data

    api.defaults.headers.common['authorization'] = `Bearer ${token}`

    setData({ token, user })
  }

  return <AuthContext.Provider value={{ user: data.user, signIn }}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
