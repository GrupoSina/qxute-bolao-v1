import React, { useRef } from 'react'
import { Button, Link } from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

export default function HowItWorks() {
  const howItWorksRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-white-texture flex flex-col" ref={howItWorksRef}>
      <h1
        className={`${fontOpenSans.className} my-6 text-center text-[#00409F] text-[18px] font-extrabold`}
      >
        COMO FUNCIONA?
      </h1>
      <div className="mx-auto w-[85%] flex flex-col justify-center items-center space-y-4">
        <Button
          className={`bg-[#1F67CE] text-[12px] font-bold text-white py-3 px-6 ${fontOpenSans.className}`}
        >
          PASSO 1
        </Button>
        <h1 className="text-[#1F67CE]">
          Crie sua conta ou faça o login de um acesso já existente.{' '}
        </h1>
        <Button className="bg-[#1F67CE] text-[12px] font-bold text-white py-3 px-6">
          PASSO 2
        </Button>
        <h1 className="text-[#1F67CE]">
          Avalie os jogos disponíveis e faça o seu palpite.
        </h1>
        <Button className="bg-[#1F67CE] text-[12px] font-bold text-white py-3 px-6">
          PASSO 3
        </Button>
        <h1 className="text-[#1F67CE]">
          Agora é só acompanhar no Instagram do{' '}
          <Link
            href="https://instagram.com/_qxute"
            target="_blank"
            rel="noopener noreferrer"
          >
            @qxute
          </Link>{' '}
          o resultado e receber seu prêmio!
        </h1>
      </div>

      <Button
        as={Link}
        href="/login"
        className={`w-[85%] mx-auto rounded-full bg-[#00764B] text-white text-[14px] font-bold my-8 ${fontOpenSans.className}`}
      >
        Participar
      </Button>
    </div>
  )
}
