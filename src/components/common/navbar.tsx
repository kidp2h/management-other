import { ModeToggle } from '@/components/common/mode-toggle';
import { SheetMenu } from '@/components/common/sheet-menu';
import { UserNav } from '@/components/common/user-nav';

type NavbarProps = {
  title: string;
  isAuth: boolean;
};

export function Navbar({ title, isAuth }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          {isAuth && <SheetMenu />}
          <h1 className="font-bold text-blue-500">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          {isAuth && <UserNav />}
        </div>
      </div>
    </header>
  );
}
