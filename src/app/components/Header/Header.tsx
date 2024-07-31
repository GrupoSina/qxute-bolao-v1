'use client'

import React, { useEffect, useState, useCallback } from 'react'
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
import { usePathname, useRouter } from 'next/navigation'
import { Roboto } from 'next/font/google'

import AOS from 'aos'
import 'aos/dist/aos.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

interface MenuItem {
  menuItem: string
  function?: () => void
  route: string | null
  onlyAdmin?: boolean
}

export default function Header() {
  const { handleSignOut, role, isAuthenticated } = useAuthContext()

  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleHomeNavigation = useCallback(() => {
    role === 'ADMIN' ? router.push('/home-admin') : router.push('/home-user')
  }, [role, router])

  const handleMatchesNavigation = useCallback(() => {
    router.push('/home-admin/matches')
  }, [router])

  const handleBetNavigation = useCallback(() => {
    router.push('/home-user')
  }, [router])

  const handleWinnersNavigation = useCallback(() => {
    router.push('/winners')
  }, [router])

  const handleRecoverPasswordNavigation = useCallback(() => {
    router.push('/recover-password')
  }, [router])

  const handleRulesNavigation = useCallback(() => {
    router.push('/rules')
  }, [router])

  const handleSignOutNavigation = useCallback(() => {
    handleSignOut()
  }, [handleSignOut])

  useEffect(() => {
    AOS.init()
  }, [])

  const handleScrollToSection = useCallback(() => {
    const section =
      document.querySelector('#how-it-works-desktop') ||
      document.querySelector('#how-it-works-mobile')
    if (section) {
      AOS.refresh()
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const menuItemsDefault: MenuItem[] = [
    { menuItem: 'Home', route: '/' },
    { menuItem: 'Registro', route: '/register' },
    { menuItem: 'Login', route: '/login' },
    { menuItem: 'Redefinir senha', route: '/recover-password' },
    { menuItem: 'Regras', route: '/rules' },
  ]

  const menuItemsAuth: MenuItem[] = [
    {
      menuItem: 'Home',
      function: handleHomeNavigation,
      route: role === 'ADMIN' ? '/home-admin' : '/home-user',
    },
    {
      menuItem: 'Partidas',
      function: handleMatchesNavigation,
      onlyAdmin: true,
      route: '/home-admin/matches',
    },
    {
      menuItem: 'Aposte',
      function: handleBetNavigation,
      route: '/home-user',
    },
    {
      menuItem: 'Vencedores',
      function: handleWinnersNavigation,
      route: '/winners',
    },
    {
      menuItem: 'Redefinir senha',
      function: handleRecoverPasswordNavigation,
      route: '/recover-password',
    },
    {
      menuItem: 'Regras',
      function: handleRulesNavigation,
      route: '/rules',
    },
    {
      menuItem: 'Sair',
      function: handleSignOutNavigation,
      route: null,
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
        wrapper: ['flex justify-between'],
        menu: ['bg-black bg-opacity-60 backdrop-blur-none'],
      }}
    >
      <NavbarContent className="relative flex justify-between items-center w-full md:hidden">
        <NavbarMenuToggle />
        <NavbarBrand className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
          <Link className="cursor-pointer" href="/">
            <Image src="/qxutelogo.png" alt="qxute logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <Link className="cursor-pointer hidden md:flex" href="/">
        <Image src="/qxutelogo.png" alt="qxute logo" />
      </Link>

      <NavbarMenu className="px-0 py-0">
        <div className="bg-white py-4 h-full w-[50%]">
          {(!isAuthenticated ? menuItemsDefault : menuItemsAuth).map(
            (item, index) =>
              !(item.onlyAdmin && role !== 'ADMIN') && (
                <NavbarMenuItem key={`${item.menuItem}-${index}`}>
                  <Link
                    className={`px-4 py-1 cursor-pointer w-full text-[#00409F] ${pathname === item.route ? 'font-bold' : ''}`}
                    onPress={item.function}
                    size="lg"
                    color={
                      index === 2
                        ? 'warning'
                        : index ===
                            (isAuthenticated
                              ? menuItemsAuth.length - 1
                              : menuItemsDefault.length - 1)
                          ? 'danger'
                          : 'foreground'
                    }
                    href={item.route?.toLowerCase()}
                  >
                    {item.menuItem}
                  </Link>
                </NavbarMenuItem>
              ),
          )}
        </div>
      </NavbarMenu>

      <NavbarContent
        justify="center"
        className="hidden md:flex gap-4 max-w-[100px] md:justify-center md:items-center"
      >
        <NavbarItem>
          <Button
            className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
            onPress={() =>
              role === 'ADMIN'
                ? router.push('/home-admin')
                : role === 'USER' && router.push('/')
            }
          >
            Inicio
          </Button>
        </NavbarItem>

        {isAuthenticated && role === 'ADMIN' && (
          <NavbarItem>
            <Button
              className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
              onPress={() => router.push('/home-admin/matches')}
            >
              Partidas
            </Button>
          </NavbarItem>
        )}

        {isAuthenticated && (
          <>
            <NavbarItem>
              <Button
                className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
                onPress={() => router.push('/home-user')}
              >
                Aposte
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
                onPress={() => router.push('/winners')}
              >
                Vencedores
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
                onPress={() => router.push('/rules')}
              >
                Regras
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                className={`${roboto.className} text-white font-bold text-[18px] bg-transparent`}
                onPress={() => router.push('/recover-password')}
              >
                Redefinir senha
              </Button>
            </NavbarItem>
          </>
        )}

        {pathname === '/' && (
          <NavbarItem>
            <button
              className={`${roboto.className} text-white font-normal text-[18px]`}
              onClick={handleScrollToSection}
            >
              Como funciona
            </button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="hidden md:flex max-w-[80px]">
        {isAuthenticated ? (
          <Button
            className="rounded-full bg-white py-3 px-8 font-headingExtraBold text-[#00409F] text-[16px]"
            onClick={handleSignOut}
          >
            SAIR
          </Button>
        ) : (
          <Button
            className="rounded-full bg-white py-3 px-8 font-headingExtraBold text-[#00409F] text-[16px]"
            onClick={() => router.push('/login')}
          >
            LOGIN
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  )
}
