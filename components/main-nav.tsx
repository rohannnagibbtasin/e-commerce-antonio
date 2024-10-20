'use client';

import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

export default function MainNav({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.storeid}`,
            label: 'Overview',
            active: pathname === `/${params.storeid}`
        },
        {
            href: `/${params.storeid}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeid}/billboards`
        },
        {
            href: `/${params.storeid}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeid}/settings`
        }
    ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {
            routes.map((route)=>(
                <Link key={route.href} href={route.href} className={cn('text-sm font-medium transition-colors hover:text-primary', route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>{route.label}</Link>
            ))
        }
    </nav>
  )
}
