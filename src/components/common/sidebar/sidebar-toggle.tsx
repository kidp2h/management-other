'use client';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarToggleProps = {
  isOpen: boolean | undefined;
  setToggle?: () => void;
};

export function SidebarToggle({ isOpen, setToggle }: SidebarToggleProps) {
  return (
    <div className="invisible absolute right-[-16px] top-[12px] z-20 lg:visible">
      <Button
        onClick={() => setToggle?.()}
        className="size-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform ease-in-out duration-700',
            isOpen === false ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    </div>
  );
}
