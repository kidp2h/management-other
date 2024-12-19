import { clerkClient, currentUser } from '@clerk/nextjs/server';
import React from 'react';

import ApplicationsManagementSection from '@/components/features/application/applications-management-section';
import { getApplications } from '@/db/queries/applications';
import { getApplicationsSchema } from '@/lib/zod/schemas/application-schema';
import type { SearchParams } from '@/types';

export interface ApplicationsManagementPageProps {
  searchParams: SearchParams;
}
export default async function ApplicationsManagementPage({
  searchParams,
}: ApplicationsManagementPageProps) {
  const search = getApplicationsSchema.parse(searchParams);
  const applications = getApplications(search);
  const user = await currentUser();
  console.log(user?.publicMetadata);
  try {
    const users = await clerkClient().users.getUserList({
      limit: 500,
    });
    return (
      <ApplicationsManagementSection
        applications={applications}
        users={JSON.parse(JSON.stringify(users.data))}
      />
    );
  } catch (error) {
    console.log(error);
  }
}
