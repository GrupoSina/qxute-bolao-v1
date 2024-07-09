'use client'
import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  Link,
  Image,
} from '@nextui-org/react'
import { useAuthContext } from '@/context/AuthContext'
import { parseCookies } from 'nookies'
import { decodeToken } from '@/utils/jwt'
import { usePathname, useRouter } from 'next/navigation'

export default function App() {
  const { handleSignOut } = useAuthContext()
  const { 'qxute-bolao:x-token': sessionKey } = parseCookies()
  const decoded = decodeToken(sessionKey)
  const { push } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

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

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
      className="bg-[#184076] text-white"
      classNames={{
        menu: ['bg-black bg-opacity-60 backdrop-blur-none'],
      }}
    >
      <NavbarContent className="">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-16">
        <NavbarBrand>
          <Link className="cursor-pointer" href="/">
            <Image src="/qxutelogo.png" alt="qxute logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

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
    </Navbar>
  )
}
