import { ReactNode } from 'react'

type User = {
  id: string
  name: string
  email: string
  driver_license: string
  avatar: string
}

type AuthState = {
  token: string
  user: User
}

type SignInCredencials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  signIn: (credencials: SignInCredencials) => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export { User, AuthState, SignInCredencials, AuthContextData, AuthProviderProps }
