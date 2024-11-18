'use client';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import type { ClerkAPIError } from '@clerk/types';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import type { z } from 'zod';

// import { env } from '@/../env.mjs';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { loginSchema } from '@/lib/zod/schemas';
import { useLoading } from '@/providers/loading-provider';
import { ClerkCode } from '@/types';

export const LoginForm = () => {
  const { signIn, setActive } = useSignIn();
  const { setLoading } = useLoading();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>();

  const router = useRouter();

  const signInWithCode = async ({
    code,
    password,
  }: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn?.create({
        identifier: code,
        password,
      });
      if (result && result.status === 'complete') {
        await setActive?.({ session: result.createdSessionId });

        router.push('/');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (errors) {
      switch (errors[0].code) {
        case ClerkCode.NOT_FOUND:
          toast('Tài khoản không tồn tại');
          break;
        default:
          toast('Mã cán bộ hoặc mật khẩu không đúng', {
            description: `${dayjs().format('h:mm A')}`,
            action: {
              label: 'Quên mật khẩu ?',
              onClick: () => console.warn('forgot'),
            },
          });
          break;
      }
    }
  }, [errors]);
  return (
    <AutoForm
      onSubmit={credential => {
        setLoading(true);
        signInWithCode(loginSchema.parse(credential));
        // setCredential(credential);
      }}
      formSchema={loginSchema}
      fieldConfig={{
        password: {
          inputProps: {
            type: 'password',
            placeholder: 'Mật khẩu',
          },
        },
        code: {
          inputProps: {
            type: 'text',
            placeholder: 'Mã cán bộ',
          },
        },
      }}
    >
      {/* <ReCAPTCHA
        sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        ref={recaptchaRef}
        onChange={handleChange}
        size="invisible"
        className="fixed bottom-0 z-50"
        onExpired={handleExpired}
      /> */}
      <AutoFormSubmit className="bg-blue-500 hover:bg-blue-600">
        Đăng nhập
      </AutoFormSubmit>
    </AutoForm>
  );
};
