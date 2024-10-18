import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Swiper() {
  return (
    <div className="w-full flex justify-center">
      <div className=" w-full relative h-[240px] flex justify-center items-center">
        <Link
          href="https://www.youtube.com/watch?v=Ncw9iEi-krs"
          target="_blank"
        >
          <Image
            src={'/banner-qxute-video-mobile.png'}
            alt="bet vip banner"
            className="cursor-pointer"
            fill
          />
        </Link>
      </div>
    </div>
  )
}
