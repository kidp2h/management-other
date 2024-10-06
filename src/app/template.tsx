'use client';
import 'dayjs/locale/vi';

import dayjs from 'dayjs';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  dayjs.locale('vi');
  return <div>{children}</div>;
}
