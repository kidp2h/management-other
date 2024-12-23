import React from 'react';

import type { getApplicationCompletedWithResearcher } from '@/db/actions/applications';

export interface ApplicationCompletedTableProps {
  data: Awaited<ReturnType<typeof getApplicationCompletedWithResearcher>>;
}
export default function ApplicationCompletedTable({
  data,
}: ApplicationCompletedTableProps) {
  return <div></div>;
}
