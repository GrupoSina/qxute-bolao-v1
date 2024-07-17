'use client'

import React, { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  Link,
  Image,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import { useAuthContext } from '@/context/AuthContext'
import { parseCookies } from 'nookies'
import { decodeToken } from '@/utils/jwt'
import { usePathname, useRouter } from 'next/navigation'
import { Roboto } from 'next/font/google'

import AOS from 'aos'
import 'aos/dist/aos.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App() {
  const { handleSignOut } = useAuthContext()
  const { 'qxute-bolao:x-token': sessionKey } = parseCookies()
  const decoded = decodeToken(sessionKey)
  const { push } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const menuItemsDefault = [
    {
      menuItem: 'Home',
      route: '/',
    },
    {
      menuItem: 'Registro',
      route: '/register',
    },
    {
      menuItem: 'Login',
      route: '/login',
    },
    {
      menuItem: 'Redefinir senha',
      route: '/recover-password',
    },
  ]

  const menuItemsAuth = [
    {
      menuItem: 'Home',
      function: () => {
        decoded?.role === 'ADMIN' ? push('/home-admin') : push('/home-user')
        setIsMenuOpen(false)
      },
      route: decoded?.role === 'ADMIN' ? '/home-admin' : '/home-user',
    },
    {
      menuItem: 'Partidas',
      function: () => {
        push('/home-admin/matches')
        setIsMenuOpen(false)
      },
      onlyAdmin: true,
      route: '/home-admin/matches',
    },
    {
      menuItem: 'Redefinir senha',
      function: () => {
        push('/recover-password')
        setIsMenuOpen(false)
      },
      route: '/recover-password',
    },

    {
      menuItem: 'Sair',
      function: () => {
        handleSignOut()
        setIsMenuOpen(false)
      },
      route: '/',
    },
  ]

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
      className="bg-[#184076] text-white"
      classNames={{
        wrapper: ['flex justify-around'],
        menu: ['bg-black bg-opacity-60 backdrop-blur-none'],
      }}
    >
      <NavbarContent className="relative flex justify-between items-center w-full sm:hidden">
        <NavbarMenuToggle />
        <NavbarBrand className="absolute left-1/2 transform -translate-x-1/2 sm:hidden">
          <Link className="cursor-pointer" href="/">
            <Image src="/qxutelogo.png" alt="qxute logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <Link className="cursor-pointer hidden sm:flex" href="/">
        <Image src="/qxutelogo.png" alt="qxute logo" />
      </Link>

      <NavbarMenu className="px-0 py-0">
        <div className="bg-white py-4 h-full w-[50%]">
          {!sessionKey ? (
            <>
              {menuItemsDefault.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    className={`px-4 py-1 cursor-pointer w-full text-[#00409F] ${pathname === item.route ? 'font-bold' : ''}`}
                    color={
                      index === 2
                        ? 'warning'
                        : index === menuItemsDefault.length - 1
                          ? 'danger'
                          : 'foreground'
                    }
                    href={item.route.toLowerCase()}
                    size="lg"
                  >
                    {item.menuItem}
                  </Link>
                </NavbarMenuItem>
              ))}
            </>
          ) : (
            <>
              {menuItemsAuth.map((item, index) => (
                <div key={index}>
                  {!(item.onlyAdmin && decoded?.role !== 'ADMIN') && (
                    <NavbarMenuItem key={`${item}-${index}`}>
                      <Link
                        className={`px-4 py-1 cursor-pointer w-full text-[#00409F] ${pathname === item.route ? 'font-bold' : ''}`}
                        onPress={item.function}
                        size="lg"
                        color={'warning'}
                      >
                        {item.menuItem}
                      </Link>
                    </NavbarMenuItem>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </NavbarMenu>

      <NavbarContent className="hidden sm:flex gap-4 max-w-[190px]">
        <NavbarItem>
          <Link
            className={`${roboto.className} text-white font-bold text-[18px]`}
            href={'/'}
          >
            Início
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className={`${roboto.className} text-white font-normal text-[18px]`}
          >
            Como funciona
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex max-w-[80px]">
        <Button
          className="rounded-full bg-white py-3 px-8 font-headingExtraBold text-[#00409F] text-[16px]"
          onClick={() => router.push('/login')}
        >
          LOGIN
        </Button>
      </NavbarContent>
    </Navbar>
  )
}
