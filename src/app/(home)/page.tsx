'use client'
import React, { useEffect, useRef } from 'react'
import Swiper from '../components/Swiper/Swiper'
import CarrosselBetVip from '../components/CarrosselBetVip/CarrosselBetVip'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import BetVipBanner from '../components/BetVipBanner/BetVipBanner'
import { Image } from '@nextui-org/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HowItWorksDesktop from '../components/HowItWorksDesktop/HowItWorksDesktop'
import HeroSectionDesktop from '../components/HeroSectionDesktop/HeroSectionDesktop'

export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <main className={`w-full h-auto flex flex-col`}>
      {/* Desktop */}
      <div className="lg:flex flex-col gap-12 w-full items-center hidden bg-[#1F67CE] h-full">
        <HeroSectionDesktop howItWorksRef={howItWorksRef} />
        <div className="w-full flex justify-center bg-transparent -mb-[150px] ">
          <div className="max-w-[1140px] w-full h-[180px]">
            <Image
              src="/placeholder-image-large.png"
              alt="placeholder"
              className="max-w-[1140px] w-full h-[180px]"
            />
          </div>
        </div>
        <HowItWorksDesktop ref={howItWorksRef} />
      </div>

      {/* Mobile */}
      <div className="lg:hidden block">
        <Swiper />
        <CarrosselBetVip />
        <HowItWorks />
        <BetVipBanner />
      </div>
    </main>
  )
}
