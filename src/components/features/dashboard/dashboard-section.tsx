import React from 'react';

import AutoBreadcrumb from '@/components/common/auto-breadcrumb';
import MainContent from '@/components/common/main-content';
import type { getApplicationsRecent7Days } from '@/db/actions/applications';
import { ContentLayout } from '@/layouts';

import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import OverviewSection from './overview-section';
import RecentApplicationsSection from './recent-applications-section';

export interface DashboardSectionProps {
  data: {
    countApplications: number;
    countApplicationsReported: number;
    countApplicationsResearching: number;
    countApplicationsCompleted: number;
    applicationsRecent3Months: {
      date: Date;
      pending: number;
      completed: number;
    }[];
    applicationsRecent7Days: Awaited<
      ReturnType<typeof getApplicationsRecent7Days>
    >;
    applicationsRecent6Months: {
      date: Date;
      pending: number;
      completed: number;
    }[];
  };
}

export default function DashboardSection({ data }: DashboardSectionProps) {
  const items = [{ name: 'Bảng điều khiển' }];
  return (
    <ContentLayout title="Bảng điều khiển">
      <AutoBreadcrumb items={items} />
      <MainContent>
        <div className="mb-5 text-2xl font-extrabold uppercase">Tổng quan</div>
        <OverviewSection
          data={{
            countApplications: data?.countApplications,
            countApplicationsReported: data?.countApplicationsReported,
            countApplicationsResearching: data?.countApplicationsResearching,
            countApplicationsCompleted: data?.countApplicationsCompleted,
          }}
        />
        <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-7">
          <BarGraph
            data={{
              applicationsRecent3Months: data?.applicationsRecent3Months,
            }}
          />
          <RecentApplicationsSection
            data={{
              applicationsRecent7Days: data?.applicationsRecent7Days,
            }}
          />
          <AreaGraph
            data={{
              applicationsRecent6Months: data?.applicationsRecent6Months,
            }}
          />
          {/* <PieGraph /> */}
        </div>
      </MainContent>
    </ContentLayout>
  );
}
