import { z } from 'zod';

export const createUserSchema = (roles: string[]) => {
  return z.object({
    username: z
      .string({
        required_error: 'Tên đăng nhập không được để trống',
      })
      .describe('Mã cán bộ'),
    password: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải có ít nhất 8 ký tự',
      })
      .describe('Mật khẩu'),
    firstName: z
      .string({
        required_error: 'Tên không được để trống',
      })
      .describe('Tên'),
    middleName: z.string().optional().describe('Họ đệm'),
    lastName: z
      .string({
        required_error: 'Họ không được để trống',
      })
      .describe('Họ'),
    birthday: z
      .date({
        required_error: 'Ngày sinh không được để trống',
      })
      .describe('Ngày sinh'),
    role: z.enum(roles as [string, ...string[]]).describe('Vai trò'),
  });
};
export const updateUserSchema = (roles: string[]) => {
  return createUserSchema(roles);
};
export type UpdateUserSchema = z.infer<ReturnType<typeof updateUserSchema>>;
export type CreateUserSchema = z.infer<ReturnType<typeof createUserSchema>>;
