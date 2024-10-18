'use client'

import Image from 'next/image'
import React from 'react'

type QxuteBannerProps = {
  transparent?: boolean
}

export default function QxuteBanner({ transparent }: QxuteBannerProps) {
  return (
    <div
      className={`${!transparent && 'bg-[#00409F]'} w-full min-h-[250px] flex items-center justify-center`}
    >
      <div className="w-[90%] h-[180px] relative md:hidden">
        <Image
          src={'/banner-mobile.png'}
          alt="bet vip banner"
          className="object-fill rounded-2xl max-w-[1140px] w-full h-[180px] md:hidden"
          // width={1140}
          // height={180}
          fill
        />
      </div>
      <div className="max-w-[1140px] w-[1140px] h-[180px] relative hidden md:block">
        <Image
          src={'/banner-large.png'}
          alt="bet vip banner"
          className="object-fill rounded-2xl max-w-[1140px] w-full h-[180px] hidden md:block"
          // width={1140}
          // height={180}
          fill
        />
      </div>
    </div>
  )
}
