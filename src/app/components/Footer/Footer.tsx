import React from 'react'
import Image from 'next/image'
import qxutelogo from '../../../../public/qxutelogo.png'
import twittericon from '../../../../public/twittericon.png'
import youtubeicon from '../../../../public/youtubeicon.png'
import instagramicon from '../../../../public/instagramicon.png'
import tiktokicon from '../../../../public/tiktokicon.png'
import { Link } from '@nextui-org/react'

export default function Footer() {
  return (
    <div className="h-auto space-y-4 md:h-[140px] bg-[#184076] py-5 md:py-0 flex flex-col md:flex-row items-center justify-around  w-full">
      <Image src={qxutelogo} alt="logoedsfooter" className="h-[28px]" />
      <p className="font-robotoRegular text-white">@2024 Copyright - QXUTE</p>
      <div className="flex space-x-3 cursor-pointer">
        <Link
          href="https://twitter.com/qxute"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={twittericon} alt="twittericon" />
        </Link>
        <Link
          href="https://youtube.com/@qxutv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={youtubeicon} alt="youtubeicon" />
        </Link>
        <Link
          href="https://instagram.com/_qxute"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={instagramicon} alt="instagramicon" />
        </Link>
        <Link
          href="https://tiktok.com/@qxute"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
        >
          <Image src={tiktokicon} alt="instagramicon" height={24} width={25} />
        </Link>
      </div>
    </div>
  )
}
