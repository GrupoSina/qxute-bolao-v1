import React from 'react'
import { Button } from '@nextui-org/react'
import { Open_Sans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const fontOpenSans = Open_Sans({ subsets: ['latin'] })

interface HeroSectionDesktopProps {
  howItWorksRef: React.RefObject<HTMLDivElement>
}

export default function HeroSectionDesktop({
  howItWorksRef,
}: HeroSectionDesktopProps) {
  const handleScroll = () => {
    if (howItWorksRef && howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="lg:flex hidden items-center w-full h-[400px] mt-12 justify-center space-x-7">
      <div className="flex flex-col bg-[#1F67CE] p-10 items-start max-w-[550px]">
        <h1
          className={`text-center font-chineseRocksRegular md:text-[56px] text-[32px] font-extrabold text-white`}
        >
          BOLÃO DO QXUTE
        </h1>
        <div className="flex flex-col">
          <p className="text-white font-monumentExtendedRegular md:text-[16px]">
            Acha que manda bem nos palpites e quer ganhar uns prêmios do Qxute
            sem gastar nada? Então chegou sua hora! Dá o teu chute, crava teu
            palpite e fatura os prêmios!
          </p>
          <Button
            onClick={handleScroll}
            variant="bordered"
            className={`mt-6 max-w-[170px] w-full border-solid border-white text-white text-[14px] font-bold rounded-full ${fontOpenSans.className}`}
          >
            Como funciona
          </Button>
        </div>
      </div>
      <div className="w-[558px] h-[350px] relative">
        <Link
          href="https://www.youtube.com/watch?v=Ncw9iEi-krs"
          target="_blank"
        >
          <Image
            src={'/banner-qxute-video-large.png'}
            alt="bet vip banner"
            className="cursor-pointer object-fill rounded-2xl max-w-[1140px] w-full h-[180px]"
            fill
          />
        </Link>
      </div>
    </div>
  )
}
