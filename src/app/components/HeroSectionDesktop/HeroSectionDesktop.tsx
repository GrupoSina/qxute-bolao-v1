import React from 'react'
import { Button, Image } from '@nextui-org/react'
import { TypewriterEffectSmooth } from '../TypewitterEffect/TypeWritterEffect'
import { Open_Sans } from 'next/font/google'

const fontOpenSans = Open_Sans({ subsets: ['latin'] })

interface HeroSectionDesktopProps {
  howItWorksRef: React.RefObject<HTMLDivElement>
}

export default function HeroSectionDesktop({
  howItWorksRef,
}: HeroSectionDesktopProps) {
  const words = [
    {
      text: 'BOLÃO',
    },

    {
      text: 'DO QXUTE',
    },
  ]

  const handleScroll = () => {
    console.log('s')
    if (howItWorksRef && howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="lg:flex hidden items-center max-w-[1140px] h-[400px] mt-12">
      <div className="flex flex-col bg-[#1F67CE] p-10 items-start max-w-[550px]">
        <h1
          className={`text-center ${fontOpenSans.className} text-[48px] font-extrabold mb-6 text-white`}
        >
          <TypewriterEffectSmooth words={words} />
        </h1>
        <div
          className="flex flex-col"
          data-aos="zoom-in"
          data-aos-once="true"
          data-aos-delay="2000"
          data-aos-duration="1000"
        >
          <p className="text-white">
            Tá se achando bom nos palpites e tá afim de ganhar uma óia do Qxute
            sem gastar nada? Então aqui é teu lugar. Dale no teu palpite e
            garante teus prêmios!
          </p>
          <Button
            onClick={handleScroll}
            variant="bordered"
            className={`mt-6 border-solid border-white text-white text-[14px] font-bold rounded-full ${fontOpenSans.className}`}
          >
            Como Funciona
          </Button>
        </div>
      </div>
      <div className="w-[558px] h-[350px]">
        <Image
          className="w-[558px] h-[350px]"
          src="/betvipbanner.png"
          alt="placeholder"
        />
      </div>
    </div>
  )
}
