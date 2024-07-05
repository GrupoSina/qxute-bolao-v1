import React from 'react'
import type { Metadata } from 'next'
import { Open_Sans as OpenSans } from 'next/font/google'
import '../globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const openSans = OpenSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bolão QXUTE + BETVIP - Home',
  description: 'Bolão QXUTE + BETVIP',
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${openSans.className} flex flex-col justify-start items-start min-h-screen `}
    >
      <Header />
      <div className="min-h-screen w-full">{children}</div>
      <div className="flex w-full">
        <Footer />
      </div>
    </div>
  )
}
