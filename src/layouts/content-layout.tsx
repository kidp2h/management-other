'use client';
import { Navbar } from '@/components/common/navbar';

type ContentLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} isAuth />
      <div className="container px-4 py-8 sm:px-8">{children}</div>
    </div>
  );
}
