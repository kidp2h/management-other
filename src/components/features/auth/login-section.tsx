'use client';
import React from 'react';

import { LoginForm } from './login-form';

type AuthSectionProps = {};

export const LoginSection = ({}: AuthSectionProps) => {
  return (
    <div className="h-[calc(100vh-3.5rem-3.5rem)]">
      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <div className="w-1/4 px-4 py-5">
          <div className="xl:w-full">
            {/* Title */}
            <h1 className="scroll-m-20 text-nowrap text-4xl font-extrabold uppercase tracking-tight text-blue-500 lg:text-5xl">
              Đăng nhập
            </h1>
            <p className="mb-24 mt-3 text-xl text-muted-foreground">
              Đăng nhập để sử dụng hệ thống
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
