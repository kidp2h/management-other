'use client';
import z from 'zod';

export const loginSchema = z.object({
  code: z
    .string({
      required_error: 'Mã cán bộ không được để trống',
    })

    .describe('Mã cán bộ'),

  password: z
    .string({
      required_error: 'Mật khẩu không được để trống',
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe('Mật khẩu')
    .min(8, {
      message: 'Mật khẩu phải có ít nhất 8 ký tự',
    }),
});
