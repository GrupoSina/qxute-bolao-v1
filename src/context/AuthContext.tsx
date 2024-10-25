'use client'
import { api } from '@/services/api/api'
import { decodeToken } from '@/utils/jwt'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

type SendCodeProps = {
  userId: string
  phone: string
}

type AuthContextType = {
  handleAuthWithToken: (accessToken: string) => void
  handleSignOut: () => void
  sendCodeProps?: SendCodeProps
  handleSetSendCodeProps: (value: SendCodeProps) => void
  resendCodeAvailable: boolean
  handleResendCodeAvailable: (value: boolean) => void
  isAuthenticated?: boolean
  setIsAuthenticaded: React.Dispatch<React.SetStateAction<boolean>>
  role?: 'ADMIN' | 'USER'
  setRole: React.Dispatch<React.SetStateAction<'ADMIN' | 'USER' | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const { 'qxute-bolao:x-token': sessionKey } = parseCookies()

  const [sendCodeProps, setSendCodeProps] = useState<SendCodeProps>()
  const [resendCodeAvailable, setResendCodeAvailable] = useState(false)

  const [isAuthenticated, setIsAuthenticaded] = useState(false)
  const [role, setRole] = useState<'ADMIN' | 'USER' | undefined>()
  const { 'qxute-bolao:x-token': sessionKey } = parseCookies()
  const decoded = decodeToken(sessionKey)

  useEffect(() => {
    if (sessionKey) {
      setRole(decoded?.role)
      setIsAuthenticaded(true)
    } else {
      setIsAuthenticaded(false)
    }
  }, [sessionKey, decoded])

  function handleAuthWithToken(acessToken: string) {
    setCookie(undefined, 'qxute-bolao:x-token', acessToken, {
      maxAge: 60 * 60 * 168, // 1 week
    })
    const decode = decodeToken(acessToken)

    if (decode?.role) {
      switch (decode?.role) {
        case 'ADMIN':
          window.location.href = '/home-admin'
          break
        default:
          window.location.href = '/home-user'
      }
    }
  }

  function handleSignOut() {
    destroyCookie(undefined, 'qxute-bolao:x-token')
    api.defaults.headers.common.Authorization = ''
    window.location.href = '/login'
  }

  function handleSetSendCodeProps(value: SendCodeProps) {
    setSendCodeProps(value)
  }

  function handleResendCodeAvailable(value: boolean) {
    setResendCodeAvailable(value)
  }

  const contextValue: AuthContextType = {
    handleAuthWithToken,
    handleSignOut,
    handleSetSendCodeProps,
    sendCodeProps,
    handleResendCodeAvailable,
    resendCodeAvailable,
    isAuthenticated,
    setIsAuthenticaded,
    role,
    setRole,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  return context
}
