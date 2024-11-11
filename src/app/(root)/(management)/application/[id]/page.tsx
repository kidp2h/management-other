import { redirect } from 'next/navigation';
import React from 'react';

import ApplicationDetailSection from '@/components/features/application/application-detail-section';
import { getApplicationById } from '@/db/queries/applications';

export default async function ApplicationPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const application = await getApplicationById(id);
  if (!application.data) {
    redirect('/applications');
  }
  return <ApplicationDetailSection application={application.data} />;
}
