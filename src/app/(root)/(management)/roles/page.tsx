import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

import RolesManagementSection from '@/components/features/roles/roles-management-section';
import { getRoles } from '@/db/queries/roles';
import { getRolesSchema } from '@/lib/zod/schemas/role-schema';
import type { SearchParams } from '@/types';

export interface RolesManagementPageProps {
  searchParams: SearchParams;
}
export default async function RolesManagementPage({
  searchParams,
}: RolesManagementPageProps) {
  const search = getRolesSchema.parse(searchParams);
  const roles = getRoles(search);
  const user = await currentUser();
  console.log(user?.publicMetadata);
  if (user?.publicMetadata.roleName !== 'Lãnh đạo') {
    redirect('/');
  }
  return <RolesManagementSection roles={roles} />;
}
