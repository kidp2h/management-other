import { ReloadIcon } from '@radix-ui/react-icons';
import { Key, User } from 'lucide-react';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { createUser } from '@/lib/clerk';
import { createUserSchema } from '@/lib/zod/schemas/user-schema';
import { useGlobalStore } from '@/providers/global-store-provider';

export interface CreateUserFormProps {
  onSuccess: () => void;
}
export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isCreatePending, startCreateTransition] = useTransition();
  const { roles } = useGlobalStore(state => state);
  return (
    <AutoForm
      onSubmit={async values => {
        startCreateTransition(async () => {
          const role = roles.find(role => role.name === values.role);
          try {
            await createUser({
              username: values.username,
              password: values.password,
              birthday: values.birthday,
              firstName: values.username,
              middleName: values.middleName,
              lastName: values.username,
              metadata: {
                roleId: role?.id || '',
                roleName: role?.name || '',
                fullName: values.middleName
                  ? `${values.firstName} ${values.middleName} ${values.lastName}`
                  : `${values.firstName} ${values.lastName}`,
              },
            });
            onSuccess();
            toast.success('Tài khoản đã được tạo');
          } catch (error) {
            console.log(error);
            toast.error('Tạo tài khoản thất bại');
          }
        });
      }}
      formSchema={createUserSchema(roles.map(role => role.name))}
      fieldConfig={{
        username: {
          icon: User,
        },
        password: {
          icon: Key,
        },
      }}
    >
      <AutoFormSubmit
        disabled={isCreatePending}
        className="w-full bg-primary text-primary-foreground"
      >
        {isCreatePending && (
          <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />
        )}
        Tạo
      </AutoFormSubmit>
    </AutoForm>
  );
}
