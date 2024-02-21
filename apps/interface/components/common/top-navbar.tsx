'use client';

import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import type { NavbarProps } from '@nextui-org/react';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { IconCrystalBall } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menu = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Knowledge',
    href: '/knowledge',
  },
] as const;

export function TopNavbar(props: Omit<NavbarProps, 'children'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <Navbar {...props} maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className='gap-4 sm:flex' justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <Link color='foreground' href='/'>
          <NavbarBrand>
            <IconCrystalBall size={32} />
            <p className='font-bold text-inherit'>Minervis Protocol</p>
          </NavbarBrand>
        </Link>

        {menu.map((item) => (
          <NavbarItem isActive={pathName === item.href} key={item.href}>
            <Link
              aria-current={pathName === item.href && 'page'}
              color={pathName === item.href ? 'primary' : 'foreground'}
              href={item.href}
              isBlock
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <DynamicWidget innerButtonComponent={<>Connect Wallet</>} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menu.map((item) => (
          <NavbarMenuItem isActive={pathName === item.href} key={item.href}>
            <Link
              aria-current={pathName === item.href && 'page'}
              className='w-full'
              color={pathName === item.href ? 'primary' : 'foreground'}
              href={item.href}
              size='lg'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
