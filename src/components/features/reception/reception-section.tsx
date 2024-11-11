'use server';
import React from 'react';

import AutoBreadcrumb from '@/components/common/auto-breadcrumb';
import MainContent from '@/components/common/main-content';
import { ContentLayout } from '@/layouts';

import CreateApplicationForm from '../application/create-application-form';

export default async function ReceptionSection() {
  const items = [
    { name: 'Trang chủ', href: '/' },
    { isSeparator: true },
    { name: 'Tiếp dân thường xuyên' },
  ];

  return (
    <ContentLayout title="Tiếp dân">
      <AutoBreadcrumb items={items} />
      <MainContent hasCard={false}>
        <CreateApplicationForm />
      </MainContent>
    </ContentLayout>
  );
}
