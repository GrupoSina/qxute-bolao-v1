import React, { useCallback } from 'react'
import { Button } from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'
import AOS from 'aos'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

export default function CarrosselBetVip() {
  const handleScrollToSection = useCallback(() => {
    const section = document.querySelector('#how-it-works-mobile')
    if (section) {
      AOS.refresh()
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="flex flex-col bg-[#1F67CE] p-10">
      <h1
        className={`text-center ${fontOpenSans.className} text-[18px] font-extrabold mb-6 text-white`}
      >
        BOLÃO DO QXUTE
      </h1>
      <p className="text-white">
        Tá se achando bom nos palpites e tá afim de ganhar uma óia do Qxute sem
        gastar nada? Então aqui é teu lugar. Dale no teu palpite e garante teus
        prêmios!
      </p>
      <Button
        variant="bordered"
        className={`mt-6 border-solid border-white text-white text-[14px] font-bold rounded-full ${fontOpenSans.className}`}
        onClick={handleScrollToSection}
      >
        COMO FUNCIONA
      </Button>
      <div className="w-[100%] bg-black mx-auto h-[160px] rounded-xl flex justify-center items-center mt-8">
        <img
          src="/qxutebannermobile1.png"
          alt="qxute banner mobile"
          className="object-fill w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}
