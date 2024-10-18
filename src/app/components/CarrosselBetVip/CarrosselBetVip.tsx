import React, { useCallback } from 'react'
import { Button } from '@nextui-org/react'
import AOS from 'aos'
import Image from 'next/image'

export default function CarrosselBetVip() {
  const handleScrollToSection = useCallback(() => {
    const section = document.querySelector('#how-it-works-mobile')
    if (section) {
      AOS.refresh()
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="flex flex-col bg-[#1F67CE] p-5">
      <h1
        className={`text-center font-chineseRocksRegular  text-[32px] mb-6 text-white`}
      >
        BOLÃO DO QXUTE
      </h1>
      <p className="text-white text-center font-monumentExtendedRegular text-[12px]">
        Acha que manda bem nos palpites e quer ganhar uns prêmios do Qxute sem
        gastar nada? Então chegou sua hora! Dá o teu chute, crava teu palpite e
        fatura os prêmios!
      </p>
      <Button
        variant="bordered"
        className={`mt-6 border-solid border-white text-white text-[14px] font-bold rounded-full`}
        onClick={handleScrollToSection}
      >
        COMO FUNCIONA
      </Button>
      <div className="w-[100%] relative mx-auto h-[160px] rounded-xl flex justify-center items-center mt-8">
        <Image
          src={'/banner-mobile.png'}
          alt="bet vip banner"
          className="object-fill rounded-2xl max-w-[1140px] w-full h-[180px] md:hidden"
          fill
        />
      </div>
    </div>
  )
}
