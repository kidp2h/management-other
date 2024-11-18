import { z } from 'zod';

import { searchParamsSchema } from '.';
import { fileSchema } from './file-schema';

export const kindOfApplication = [
  'Tranh chấp',
  'Khiếu nại',
  'Kiến nghị/phản ánh',
  'Đề nghị, kháng nghị giám đốc thẩm, tái thẩm',
  'Tin báo, tố giác về tội phạm',
  'Yêu cầu bồi thường thiệt hại do người tiến hành tố tụng gây ra',
  'Tố cáo',
] as [string, ...string[]];
export const ethnicities = [
  'Kinh',
  'Tày',
  'Thái',
  'Mường',
  'Hmong',
  'Nùng',
  'Khmer',
  'Dao',
  'Gia Rai',
  'Ede',
  'Ba Na',
  'Xơ Đăng',
  'Sán Chay',
  'Cơ Ho',
  'Chăm',
  'Sán Dìu',
  'Hrê',
  'Mnông',
  'Ra Glai',
  'Xinh Mun',
  'Bru - Vân Kiều',
  'Thổ',
  'Giáy',
  'Cơ Tu',
  'Giẻ Triêng',
  'Mạ',
  'Khơ Mú',
  'Co',
  'Tà Ôi',
  'Chơ Ro',
  'Hà Nhì',
  'Xtiêng',
  'Phù Lá',
  'La Chí',
  'Chứt',
  'Lào',
  'La Ha',
  'Pà Thẻn',
  'Lự',
  'Ngái',
  'Chăm Hroi',
  'Ơ Đu',
  'Rơ Măm',
  'Brâu',
  'Chu Ru',
] as [string, ...string[]];
export const nationalities = [
  'Việt Nam',
  'Mỹ',
  'Canada',
  'Brazil',
  'Anh',
  'Pháp',
  'Đức',
  'Ý',
  'Tây Ban Nha',
  'Nga',
  'Trung Quốc',
  'Nhật Bản',
  'Hàn Quốc',
  'Ấn Độ',
  'Úc',
  'Mexico',
  'Argentina',
  'Nam Phi',
  'Nigeria',
  'Ai Cập',
  'Thổ Nhĩ Kỳ',
  'Ả Rập Saudi',
  'Indonesia',
  'Malaysia',
  'Singapore',
  'Thái Lan',
  'Philippines',
  'Pakistan',
  'Bangladesh',
  'Sri Lanka',
  'New Zealand',
  'Hà Lan',
  'Bỉ',
  'Thụy Sĩ',
  'Áo',
  'Thụy Điển',
  'Na Uy',
  'Đan Mạch',
  'Phần Lan',
  'Hy Lạp',
  'Bồ Đào Nha',
  'Ba Lan',
  'Séc',
  'Hungary',
  'Romania',
  'Bulgaria',
  'Ukraine',
  'Kazakhstan',
  'Uzbekistan',
  'Iran',
  'Iraq',
  'Syria',
  'Liban',
  'Jordan',
  'Israel',
  'Palestine',
  'Chile',
  'Peru',
  'Colombia',
  'Venezuela',
  'Ecuador',
  'Cuba',
  'Haiti',
  'Cộng hòa Dominica',
  'Panama',
  'Costa Rica',
  'Guatemala',
  'Honduras',
  'El Salvador',
  'Nicaragua',
  'Bolivia',
  'Paraguay',
  'Uruguay',
  'Iceland',
  'Mông Cổ',
  'Nepal',
  'Bhutan',
  'Maldives',
  'Afghanistan',
  'Tunisia',
  'Morocco',
  'Algeria',
  'Ethiopia',
  'Kenya',
  'Uganda',
  'Rwanda',
  'Ghana',
  'Bờ Biển Ngà',
  'Senegal',
  'Cameroon',
  'Zimbabwe',
  'Zambia',
  'Tanzania',
  'Somalia',
  'Sudan',
  'Libya',
  'Qatar',
  'Bahrain',
  'Oman',
  'Các Tiểu vương quốc Ả Rập Thống nhất',
  'Kuwait',
  'Yemen',
  'Armenia',
  'Georgia',
  'Azerbaijan',
  'Belarus',
  'Moldova',
  'Lithuania',
  'Latvia',
  'Estonia',
] as [string, ...string[]];
export const fieldOfApplication = [
  'Lĩnh vực hành chính',
  'Lĩnh vực tư pháp',
  'Hình sự',
  'Dân sự',
  'Khác',
] as [string, ...string[]];
export const objectsOfApplication = ['Cá nhân', 'Tổ chức', 'Tập thể'] as [
  string,
  ...string[],
];
export const gender = ['Nam', 'Nữ', 'Khác'] as [string, ...string[]];

export const applicationSchema = z.object({
  id: z.string().optional(),
  code: z.string().optional(),
  fullName: z.string({
    required_error: 'Họ và tên không được để trống',
  }),
  email: z
    .string({
      invalid_type_error: 'Email không hợp lệ',
    })

    .optional(),

  identityCard: z.string({
    required_error: 'Số CCCD/CMND không được để trống',
    invalid_type_error: 'Số CCCD/CMND không hợp lệ',
  }),
  issueDate: z.date({
    required_error: 'Ngày cấp không được để trống',
    invalid_type_error: 'Ngày cấp không hợp lệ',
  }),
  placeOfIssue: z.string({
    required_error: 'Nơi cấp không được để trống',
  }),
  gender: z.string({
    required_error: 'Giới tính không được để trống',
    invalid_type_error: 'Giới tính không hợp lệ',
  }),
  phoneNumber: z.string({
    required_error: 'Số điện thoại không được để trống',
  }),
  ethnicity: z.string({
    required_error: 'Dân tộc không được để trống',
  }),
  address: z.string({
    required_error: 'Địa chỉ không được để trống',
  }),
  province: z.string({
    required_error: 'Tỉnh/Thành không được để trống',
  }),
  district: z.string({
    required_error: 'Quận/Huyện không được để trống',
  }),
  ward: z.string({
    required_error: 'Phường/Xã không được để trống',
  }),
  national: z.string({
    required_error: 'Không được để trống',
  }),
  occupation: z.string({
    required_error: 'Nghề nghiệp không được để trống',
  }),
  kindOfApplication: z.string({
    required_error: 'Loại hồ sơ không được để trống',
    invalid_type_error: 'Loại đơn không hợp lệ',
  }),
  fieldOfApplication: z.string({
    required_error: 'Lĩnh vực không được để trống',
  }),
  provinceOfIncidentOccured: z.string({
    required_error: 'Tỉnh/Thành xảy ra sự việc không được để trống',
  }),
  districtOfIncidentOccured: z.string({
    required_error: 'Quận/Huyện xảy ra sự việc không được để trống',
  }),
  wardOfIncidentOccured: z.string({
    required_error: 'Phường/Xã xảy ra sự việc không được để trống',
  }),
  addressOfIncidentOccured: z.string({
    required_error: 'Địa chỉ xảy ra sự việc không được để trống',
  }),
  content: z.string({
    required_error: 'Nội dung không được để trống',
  }),
  contentDetail: z.string({
    required_error: 'Nội dung chi tiết không được để trống',
  }),
  objectsOfApplication: z.string({
    required_error: 'Đối tượng khiếu nại không được để trống',
  }),
  ...fileSchema.shape,
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
});
export type ApplicationsSchema = z.infer<typeof applicationSchema>;
export const getApplicationsSchema = z.object({
  ...searchParamsSchema.shape,
  ...applicationSchema.partial().shape,
  acceptor: z.string().optional(),
  status: z.string().optional(),
  updatedAt: z.string().optional(),
});
export const createApplicationSchema = applicationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  code: true,
});
export const updateApplicationSchema = createApplicationSchema.partial();
export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
export type GetApplicationSchema = z.infer<typeof getApplicationsSchema>;
export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
