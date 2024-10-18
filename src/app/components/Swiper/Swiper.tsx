import Image from 'next/image'
import React from 'react'

export default function Swiper() {
  return (
    <div className="w-full flex justify-center">
      <div className=" w-full relative h-[240px] flex justify-center items-center">
        <Image src={'/banner-hero-mobile.png'} alt="bet vip banner" fill />
      </div>
    </div>
  )
}
