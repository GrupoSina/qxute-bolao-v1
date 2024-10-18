import React, { useRef } from 'react'
import { Button, Link } from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

interface HowItWorksProps {
  id: string
}

export default function HowItWorks({ id }: HowItWorksProps) {
  const howItWorksRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-white-texture flex flex-col" ref={howItWorksRef} id={id}>
      <h1
        className={`font-chineseRocksRegular my-6 text-center text-[#00409F] text-[24px] `}
        // onClick={handleScrollToSection}
      >
        COMO FUNCIONA?
      </h1>
      <div className="mx-auto w-[85%] flex flex-col justify-center items-center space-y-4 ">
        <p
          className={`bg-[#1F67CE] text-[16px] text-white py-3 px-6 mb-[-35px] rounded-full z-10 font-chineseRocksRegular`}
        >
          PASSO 1
        </p>
        <h1 className="w-full text-center font-monumentExtendedRegular text-[12px] text-[#1F67CE] border-1 border-[#1F67CE] rounded-lg pt-7 pb-4 px-3">
          Crie sua conta ou faça o login de um acesso já existente.{' '}
        </h1>
        <div className="w-full">
          <p className="mx-auto bg-[#1F67CE] w-[100px] text-[16px] text-center font-chineseRocksRegular text-white py-3 px-6 mb-[-20px] rounded-full z-10">
            PASSO 2
          </p>
          <h1 className="w-full text-center font-monumentExtendedRegular text-[12px] text-[#1F67CE] border-1 border-[#1F67CE] rounded-lg pt-7 pb-4 px-3">
            Avalie os jogos disponíveis e faça o seu palpite.
          </h1>
        </div>
        <div className="w-full">
          <p className="mx-auto bg-[#1F67CE] w-[100px] text-[16px] text-center font-chineseRocksRegular text-white py-3 px-6 mb-[-20px] rounded-full z-10">
            PASSO 3
          </p>
          <h1 className="w-full text-center text-[#1F67CE] font-monumentExtendedRegular text-[12px] border-1 border-[#1F67CE] rounded-lg pt-7 pb-4 px-3">
            Acompanhe o resultado no Instagram{' '}
            <Link
              href="https://instagram.com/_qxute"
              target="_blank"
              rel="noopener noreferrer"
            >
              @_QXUTE
            </Link>{' '}
            .
          </h1>
        </div>
      </div>

      <Button
        as={Link}
        href="/login"
        className={`w-[85%] mx-auto rounded-full bg-[#00409F] text-white text-[14px] font-bold my-8 ${fontOpenSans.className}`}
      >
        Participar
      </Button>
    </div>
  )
}
