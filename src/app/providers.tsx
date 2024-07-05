'use client'
import React from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { EventsProvider } from '@/context/EventsContext'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { HomeUserProvider } from '@/context/HomeUserContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <EventsProvider>
        <HomeUserProvider>
          <NextUIProvider locale="pt-BR">
            <main>{children}</main>
          </NextUIProvider>
        </HomeUserProvider>
      </EventsProvider>
    </AuthProvider>
  )
}
