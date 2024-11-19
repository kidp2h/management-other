'use client';
import Image from 'next/image';
import React from 'react';

import { LoginForm } from './login-form';

type AuthSectionProps = {};

export const LoginSection = ({}: AuthSectionProps) => {
  return (
    <div className="h-[calc(100vh-3.5rem-3.5rem)]">
      <div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
        <div className="mb-24 flex scroll-m-20 flex-row items-center gap-5 text-nowrap text-center text-2xl font-extrabold uppercase tracking-tight text-blue-500 lg:text-4xl">
          <Image src="/logo.png" width={80} height={80} alt="" />
          Phần mềm quản lý đơn thư khiếu nại, tố cáo
        </div>
        <div className="w-1/4 px-4 py-5">
          <div className="xl:w-full">
            {/* Title */}
            <h1 className="mb-24 scroll-m-20 text-nowrap text-center text-2xl font-extrabold uppercase tracking-tight text-blue-500 lg:text-3xl">
              Đăng nhập
            </h1>
            {/* <p className="mb-24 mt-3 text-xl text-muted-foreground">
              Đăng nhập để sử dụng hệ thống
            </p> */}

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
