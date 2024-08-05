'use client'
import React from 'react'
import { Button, useDisclosure, Image } from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'
import CreateEventModal from '@/app/components/CreateEventModal/CreateEventModal'
import { useEventsContext } from '@/context/EventsContext'
import useWindowWidth from '@/utils/window-width-hook'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

export default function HomeAdmin() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { setCurrentModalIndex } = useEventsContext()

  const windowWidth = useWindowWidth()

  return (
    <div
      className={`w-full h-full flex flex-col items-center ${fontOpenSans.className} justify-center`}
    >
      <div className="max-w-[1140px] w-full h-full flex flex-col items-center justify-center">
        <div className="mt-6 w-[90%] h-[201px] bg-white border-solid border-[1px] border-[#00764B] rounded-xl mx-auto">
          <img
            src={
              windowWidth && windowWidth > 640
                ? '/betvipbanner.png'
                : '/betvipbannermobile.png'
            }
            alt="bet vip banner"
            className="w-full h-full object-fill rounded-lg"
          />
        </div>
        <Button
          onClick={() => setCurrentModalIndex(0)}
          onPress={onOpen}
          startContent={<Image src="/addcircle.svg" alt="add circle" />}
          className="w-[90%] mx-auto mt-4 mb-6 bg-[#00764B] text-white font-bold text-[14px] py-[10px] px-[14px]"
        >
          Criar evento
        </Button>
      </div>

      <CreateEventModal isOpen={isOpen} onClose={onOpenChange} />
    </div>
  )
}
