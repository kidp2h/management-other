import { BadgeCheck, BookCheck, Loader, TicketCheck } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountAnimation from '@/components/ui/count-animation';

export interface OverviewSectionProps {
  data: {
    countApplications: number;
    countApplicationsReported: number;
    countApplicationsResearching: number;
    countApplicationsCompleted: number;
  };
}

export default function OverviewSection({ data }: OverviewSectionProps) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Số đơn cán bộ đã tiếp nhận
          </CardTitle>
          <BookCheck className="text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="inline-flex font-bold">
            <CountAnimation
              number={data?.countApplications || 0}
              className="text-2xl"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Đơn do cán bộ tiếp dân tạo trên hệ thống
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Số đơn đã báo cáo lên cấp trên
          </CardTitle>
          <TicketCheck className="text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="inline-flex font-bold">
            <CountAnimation
              number={
                data?.countApplicationsReported +
                  data?.countApplicationsCompleted +
                  data?.countApplicationsResearching || 0
              }
              className="text-2xl"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Đơn do cán bộ tiếp dân báo cáo lên lãnh đạo
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Số đơn đang điều tra
          </CardTitle>
          <Loader className="animate-spin text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="inline-flex font-bold">
            <CountAnimation
              number={data?.countApplicationsResearching || 0}
              className="text-2xl"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Đơn do kiểm sát viên điều tra
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Số đơn đã hoàn thành
          </CardTitle>
          <BadgeCheck className="text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="inline-flex font-bold">
            <CountAnimation
              number={data?.countApplicationsCompleted}
              className="text-2xl"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Đơn đã thụ lý và hoàn thành
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
