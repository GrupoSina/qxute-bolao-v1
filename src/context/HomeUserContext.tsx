import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HomeUserContextType {
  disabledMatches: { [key: string]: boolean }
  setDisabledMatches: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const HomeUserContext = createContext<HomeUserContextType | undefined>(
  undefined,
)

interface ProviderProps {
  children: ReactNode
}

export const HomeUserProvider = ({ children }: ProviderProps) => {
  const [disabledMatches, setDisabledMatches] = useState<{
    [key: string]: boolean
  }>({})

  const [loading, setLoading] = useState<boolean>(true)

  return (
    <HomeUserContext.Provider
      value={{
        disabledMatches,
        setDisabledMatches,
        loading,
        setLoading,
      }}
    >
      {children}
    </HomeUserContext.Provider>
  )
}

export const useHomeUserContext = () => {
  const context = useContext(HomeUserContext)
  if (context === undefined) {
    throw new Error('useEventsContext must be used within a HomeUserProvider')
  }
  return context
}
