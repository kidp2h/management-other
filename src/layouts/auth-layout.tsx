'use client';

import { Footer, Navbar } from '@/components/common';
import { cn } from '@/lib/utils';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar title="Management" isAuth={false} />
      <div className="h-full">{children}</div>

      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300 absolute bottom-0 ',
          'w-full',
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
