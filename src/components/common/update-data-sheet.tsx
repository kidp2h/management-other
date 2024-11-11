import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import type { FieldConfig } from '../ui/auto-form/types';

export interface UpdateDataFormProps {
  onSuccess: () => void;
  fieldConfig: FieldConfig<any>;
  data: any;
  isDialog?: boolean;
}
export interface UpdateDataSheetProps<T extends Record<string, any>>
  extends React.ComponentPropsWithRef<typeof Sheet> {
  form: ({
    onSuccess,
    fieldConfig,
    data,
    isDialog,
  }: UpdateDataFormProps & Record<any, any>) => JSX.Element;
  name: string;
  data: T;
  fieldConfig?: FieldConfig<T>;
  className?: string;
}
export function UpdateDataSheet<T extends Record<string, any>>({
  form: FormUpdate,
  name,
  fieldConfig,
  data,
  className,
  ...props
}: UpdateDataSheetProps<T>) {
  return (
    <Sheet {...props}>
      <SheetContent
        className={cn(
          'flex w-full max-w-full flex-col gap-6 overflow-auto md:w-[80%] md:max-w-full ',
          className,
        )}
      >
        <SheetHeader className="text-left">
          <SheetTitle>Cập nhật {name}</SheetTitle>
          <SheetDescription>
            Cập nhật chi tiết {name.toLowerCase()}
          </SheetDescription>
        </SheetHeader>
        <FormUpdate
          onSuccess={() => {
            props.onOpenChange?.(false);
          }}
          isDialog
          data={data}
          fieldConfig={fieldConfig || {}}
        />
      </SheetContent>
    </Sheet>
  );
}
