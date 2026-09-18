'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, FileCheck2, BookOpen, ShoppingBag } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Saga Map', href: '/saga-map', icon: Map },
    { label: 'Thi CBT', href: '/exam/ETS-2024-TEST-01', icon: FileCheck2 },
    { label: 'Sổ tay', href: '/notebook', icon: BookOpen },
    { label: 'Shop', href: '/shop', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1 transition-colors ${
                isActive ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
