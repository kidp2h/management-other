'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '../ui/card';

export interface MainContentProps {
  children: React.ReactNode;
  hasCard?: boolean;
  className?: string;
}

export default React.forwardRef<HTMLDivElement, MainContentProps>(
  ({ children, hasCard, className }, ref) => {
    return hasCard ? (
      <Card
        ref={ref}
        className={cn(
          'mt-6 h-full rounded-lg bg-zinc-100 dark:bg-zinc-900',
          className,
        )}
      >
        <CardContent className="h-full p-0">
          <div className="h-screen min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            {children}
          </div>
        </CardContent>
      </Card>
    ) : (
      <div
        ref={ref}
        className={cn(
          'mt-6 h-full min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
