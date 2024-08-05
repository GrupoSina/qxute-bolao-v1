'use client'

import React from 'react'
import useWindowWidth from '@/utils/window-width-hook'

export default function QxuteBanner() {
  const windowWidth = useWindowWidth()

  return (
    <div className="bg-[#00409F] w-screen min-h-[250px] flex justify-center items-center">
      <div className="w-[90%] bg-black h-[160px] rounded-xl flex justify-center items-center">
        <img
          src={
            windowWidth && windowWidth > 640
              ? '/qxutebanner.png'
              : '/qxutebannermobile.png'
          }
          alt="bet vip banner"
          className="w-full h-full object-fill rounded-lg"
        />
      </div>
    </div>
  )
}
