"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  if (pathname === '/') return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-medical-muted mb-4 font-medium" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-medical-text transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-slate-300" />
            {isLast ? (
              <span className="text-medical-text capitalize">{value}</span>
            ) : (
              <Link href={href} className="hover:text-medical-text transition-colors capitalize">
                {value}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
