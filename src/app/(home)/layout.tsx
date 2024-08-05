import React from 'react'
import type { Metadata } from 'next'
import { Open_Sans as OpenSans } from 'next/font/google'
import '../globals.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import QxuteBanner from '../components/QxuteBanner/QxuteBanner'

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
    <div className={`${openSans.className} flex flex-col min-h-screen`}>
      <Header />
      <div className="flex-grow w-full h-full overflow-auto bg-white-texture">
        {children}
      </div>
      <div className="flex flex-col w-full z-40">
        <QxuteBanner />
        <Footer />
      </div>
    </div>
  )
}
