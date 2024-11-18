'use client';

import { Footer, Navbar } from '@/components/common';
import { cn } from '@/lib/utils';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {/* <WavyBackground className=" mx-auto pb-40 w-full"> */}
      {/* <AuroraBackground> */}
      {/* <Spotlight
        className="-top-40 right-0 md:left-[25rem] md:-top-20 "
        fill={theme === 'dark' ? 'white' : 'black'}
      /> */}
      <Navbar
        title="Phần mềm quản lý đơn thư khiếu nại tố cáo Q8"
        isAuth={false}
      />
      <div className="size-full">{children}</div>

      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300 absolute bottom-0 ',
          'w-full',
        )}
      >
        <Footer />
      </footer>
      {/* </AuroraBackground> */}
      {/* <BeamsBackground className="z-[-1]" /> */}
      {/* </WavyBackground> */}
      {/* <Spotlight /> */}
    </div>
  );
}
