import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { getApplicationsRecent7Days } from '@/db/actions/applications';
import { cn } from '@/lib/utils';

export interface RecentApplicationsSectionProps {
  data: {
    applicationsRecent7Days: Awaited<
      ReturnType<typeof getApplicationsRecent7Days>
    >;
  };
}
export default function RecentApplicationsSection({
  data,
}: RecentApplicationsSectionProps) {
  return (
    <Card className="col-span-4 size-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Đơn gần đây</CardTitle>
        <CardDescription>
          Có {data.applicationsRecent7Days.length} đơn được nộp trong 7 ngày gần
          đây
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 overflow-y-scroll">
          <div className="space-y-8 ">
            {data.applicationsRecent7Days.map((application, index) => {
              return (
                <div
                  key={`${application.status}${index}`}
                  className="flex items-center px-2"
                >
                  <Avatar className="size-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {application.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application.email}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      'ml-auto flex w-32 justify-center bg-red-500 font-medium',
                    )}
                  >
                    {application.status === 'PENDING' && 'Đang xử lý'}
                    {application.status === 'REPORTED' && 'Đã báo cáo'}
                    {application.status === 'RESEARCHING' && 'Đang điều tra'}
                    {application.status === 'COMPLETED' && 'Đã hoàn thành'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
