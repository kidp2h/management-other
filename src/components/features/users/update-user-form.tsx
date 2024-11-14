import { ReloadIcon } from '@radix-ui/react-icons';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import type { z } from 'zod';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import type { FieldConfig } from '@/components/ui/auto-form/types';
import { updateUser } from '@/lib/clerk';
import { updateUserSchema } from '@/lib/zod/schemas/user-schema';
import { useGlobalStore } from '@/providers/global-store-provider';

export interface UpdateUserFormProps {
  onSuccess: () => void;
  fieldConfig?: FieldConfig<z.infer<ReturnType<typeof updateUserSchema>>>;
  data: any;
}
export default function UpdateUserForm({
  onSuccess,
  fieldConfig,
  data,
}: UpdateUserFormProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const { roles } = useGlobalStore(state => state);
  return (
    <AutoForm
      formSchema={updateUserSchema(roles.map(role => role.name)).partial()}
      onSubmit={async values => {
        startUpdateTransition(async () => {
          const role = roles.find(role => role.name === values.role);
          let fullName = null;
          try {
            if (values?.firstName && values?.lastName && values?.middleName) {
              fullName = values.middleName
                ? `${values.lastName} ${values.middleName} ${values.firstName}`
                : `${values.firstName} ${values.lastName}`;
            }
            console.log(role, data.publicMetadata, values.role);
            await updateUser({
              id: data.id,
              firstName: values.firstName || data.publicMetadata.firstName,
              lastName: values.lastName || data.publicMetadata.lastName,
              metadata: {
                roleName: role?.name || data.publicMetadata.roleName,
                roleId: role?.id || data.publicMetadata.roleId,
                fullName: fullName || data.publicMetadata.fullName,
              },
              birthday: values.birthday || data.publicMetadata.birthday,
              password: values.password || undefined,
              username: values.username || data.publicMetadata.username,
              // ...values,
            });

            onSuccess();
            toast.success('Tài khoản đã được cập nhật');
          } catch (error) {
            console.log(error);
            toast.error('Cập nhật tài khoản thất bại');
          }
        });
      }}
      fieldConfig={fieldConfig}
    >
      <AutoFormSubmit
        disabled={isUpdatePending}
        className="w-full bg-primary text-primary-foreground"
      >
        {isUpdatePending && (
          <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />
        )}
        Lưu thay đổi
      </AutoFormSubmit>
    </AutoForm>
  );
}
