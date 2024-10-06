'use client';

import { Card, CardContent } from '../ui/card';

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="mt-6 h-full rounded-lg bg-zinc-100 dark:bg-zinc-900">
      <CardContent className="h-full p-0">
        <div className="h-screen min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
