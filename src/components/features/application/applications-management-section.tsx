'use client';
import type { User } from '@clerk/nextjs/server';
import React, { Suspense, useEffect } from 'react';

import AutoBreadcrumb from '@/components/common/auto-breadcrumb';
import MainContent from '@/components/common/main-content';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import type { getApplications } from '@/db/queries/applications';
import { ContentLayout } from '@/layouts';
import { useGlobalStore } from '@/providers/global-store-provider';
import { TableProvider } from '@/providers/table-provider';

import { ApplicationsTable } from './applications-table';

export interface ApplicationsManagementSectionProps {
  applications: ReturnType<typeof getApplications>;
  users: User[];
}
export default function ApplicationsManagementSection({
  applications,
  users,
}: ApplicationsManagementSectionProps) {
  const items = [
    { name: 'Trang chủ', href: '/' },
    { isSeparator: true },
    { name: 'Quản lý' },
    { isSeparator: true },
    { name: 'Đơn' },
  ];
  const { fetchProvinces } = useGlobalStore(state => state);

  useEffect(() => {
    fetchProvinces();
  }, []);
  return (
    <ContentLayout title="Vai trò">
      <AutoBreadcrumb items={items} />
      <MainContent hasCard={false}>
        <TableProvider isHidden>
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={3}
                searchableColumnCount={2}
                filterableColumnCount={2}
                cellWidths={['10rem']}
                shrinkZero
              />
            }
          >
            <ApplicationsTable applications={applications} users={users} />
          </Suspense>
        </TableProvider>
      </MainContent>
    </ContentLayout>
  );
}
