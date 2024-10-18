'use client'
import React, { useEffect, useRef } from 'react'
import Swiper from '../components/Swiper/Swiper'
import CarrosselBetVip from '../components/CarrosselBetVip/CarrosselBetVip'
import HowItWorks from '../components/HowItWorks/HowItWorks'

import AOS from 'aos'
import 'aos/dist/aos.css'
import HowItWorksDesktop from '../components/HowItWorksDesktop/HowItWorksDesktop'
import HeroSectionDesktop from '../components/HeroSectionDesktop/HeroSectionDesktop'
import Image from 'next/image'

export default function Home() {
  const howItWorksRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <main className={`w-full h-auto flex flex-col`}>
      {/* Desktop */}
      <div className="lg:flex flex-col gap-12 w-full items-center hidden bg-[#1F67CE] h-full overflow-x-hidden">
        <HeroSectionDesktop howItWorksRef={howItWorksRef} />
        <div className="w-full flex justify-center bg-transparent -mb-[150px] ">
          <div className="max-w-[1140px] w-full h-[180px] relative">
            <Image
              src={'/banner-large.png'}
              alt="bet vip banner"
              className="object-fill rounded-2xl max-w-[1140px] w-full h-[180px] hidden md:block"
              fill
            />
            <div></div>
          </div>
        </div>
        <HowItWorksDesktop ref={howItWorksRef} id="how-it-works-desktop" />
      </div>

      {/* Mobile */}
      <div className="lg:hidden block">
        <Swiper />
        <CarrosselBetVip />
        <div className="max-[1140px]:block hidden">
          <HowItWorks id="how-it-works-mobile" />
        </div>
      </div>
    </main>
  )
}
