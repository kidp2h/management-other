'use client';

import type { Row } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import * as React from 'react';

import { Icons } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import type { Applications } from '@/db/schema';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ReportApplicationsDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  applications: Row<Applications>['original'][];
  showTrigger?: boolean;
  onSubmit?: () => void;
  onSuccess?: () => void;
  name: string;
}

export function ReportApplicationsDialog({
  applications,
  showTrigger = true,
  onSuccess,
  onSubmit,
  name,
  ...props
}: ReportApplicationsDialogProps) {
  const [isReportPending, startReportTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const application = applications[0];
  function onReport() {
    startReportTransition(async () => {
      onSubmit?.();
      props.onOpenChange?.(false);
      // toast.success('Đơn đã được báo cáo');
      onSuccess?.();
    });
  }
  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash className="mr-2 size-4" aria-hidden="true" />
              Báo cáo
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn không?</DialogTitle>
            <DialogDescription>
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className="text-xl font-bold">
            Xác nhận thông tin đơn trước khi báo cáo
          </div>
          <div className="mt-5 grid w-4/5 grid-cols-2 gap-5">
            <div className="font-bold">Họ và tên</div>
            <div>{application.fullName}</div>

            <div className="font-bold">Giới tính</div>
            <div>{application.gender}</div>

            <div className="font-bold">Số điện thoại</div>
            <div>{application.phoneNumber}</div>

            <div className="font-bold">CCCD/CMT</div>
            <div>{application.identityCard}</div>

            <div className="font-bold">Tỉnh/Thành</div>
            <div>{application.province}</div>

            <div className="font-bold">Quận/Huyện</div>
            <div>{application.district}</div>

            <div className="font-bold">Phường/Xã</div>
            <div>{application.ward}</div>

            <div className="font-bold">Địa chỉ</div>
            <div>{application.address}</div>

            <div className="font-bold">Quốc tịch</div>
            <div>{application.national}</div>

            <div className="font-bold">Lĩnh vực đơn</div>
            <div>{application.fieldOfApplication}</div>

            <div className="font-bold">Loại đơn</div>
            <div>{application.kindOfApplication}</div>
          </div>

          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogClose>
            <Button
              aria-label="Report selected rows"
              variant="default"
              onClick={onReport}
              disabled={isReportPending}
            >
              {isReportPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Báo cáo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Báo cáo
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bạn có chắc chắn không?</DrawerTitle>
          <DrawerDescription>
            Hành động này không thể hoàn tác.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DrawerClose>
          <Button
            aria-label="Report selected rows"
            variant="destructive"
            onClick={onReport}
            disabled={isReportPending}
          >
            {isReportPending && (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Báo cáo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
