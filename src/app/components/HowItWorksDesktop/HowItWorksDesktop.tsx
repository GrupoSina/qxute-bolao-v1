import React, { forwardRef } from 'react'
import { ButtonMovingBorder } from '../MovingBorder/MovingBorder'
import useWindowWidth from '@/utils/window-width-hook'
import { useRouter } from 'next/navigation'
import { Link } from '@nextui-org/react'

interface HowItWorksDesktopProps {
  id: string
}

const HowItWorksDesktop = forwardRef<HTMLDivElement, HowItWorksDesktopProps>(
  ({ id }, ref) => {
    const { push } = useRouter()
    const windowWidth = useWindowWidth()
    const isDesktop = windowWidth && windowWidth >= 1024
    return (
      <div
        id={id}
        ref={ref}
        className="flex flex-col items-center justify-center gap-12 w-full min-h-[600px] bg-[url('/whitetexture.png')] bg-no-repeat bg-cover bg-center overflow-x-hidden"
      >
        <h1 className="text-[48px] font-extrabold text-[#00409F] ">
          COMO FUNCIONA
        </h1>
        <div className="flex w-full justify-center space-x-64">
          <div className="flex flex-col items-center gap-4 w-[220px]">
            <p className="bg-[#1F67CE] text-white py-2 px-8 rounded-full text-[16px]">
              PASSO 1
            </p>
            <p className="text-[#1F67CE] text-[14px] text-center">
              Crie sua conta ou faça o login de um acesso já existente.{' '}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 w-[220px]">
            <p className="bg-[#1F67CE] text-white py-2 px-8 rounded-full text-[16px]">
              PASSO 2
            </p>
            <p className="text-[#1F67CE] text-[14px] text-center">
              Avalie os jogos disponíveis e faça o seu palpite.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 w-[220px]">
            <p className="bg-[#1F67CE] text-white py-2 px-8 rounded-full text-[16px]">
              PASSO 3
            </p>
            <p className="text-[#1F67CE] text-[14px] text-center">
              Acompanhe o resultado no Instagram{' '}
              <Link
                href="https://instagram.com/_qxute"
                target="_blank"
                rel="noopener noreferrer"
              >
                @_QXUTE
              </Link>{' '}
              .
            </p>
          </div>
        </div>
        {isDesktop && (
          <ButtonMovingBorder
            onClick={() => push('/login')}
            borderRadius="50rem"
            className="bg-[#00409F] rounded-full  text-white  border-[#00764B] border-[1px]"
          >
            Participar
          </ButtonMovingBorder>
        )}
      </div>
    )
  },
)

export default HowItWorksDesktop
