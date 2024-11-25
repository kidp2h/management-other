import { useUser } from '@clerk/nextjs';
import type { User as ClerkUser } from '@clerk/nextjs/server';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { render } from '@react-email/components';
import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import {
  AlarmClock,
  AtSign,
  Baby,
  Barcode,
  Bookmark,
  BriefcaseBusiness,
  CalendarPlus,
  Check,
  CircleCheckBig,
  CircleDashed,
  CircleX,
  Delete,
  FileText,
  Globe,
  History,
  IdCard,
  Map,
  MapPinCheck,
  MapPinned,
  Navigation,
  Pencil,
  PersonStanding,
  Phone,
  Pin,
  RectangleEllipsis,
  Send,
  TableOfContents,
  TypeOutline,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

import { UpdateDataSheet } from '@/components/common/update-data-sheet';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import InformationUpdateEmail from '@/components/templates/information-application';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateApplication } from '@/db/actions/applications';
import { sendEmail } from '@/lib/mail';

import { DeleteApplicationsDialog } from './delete-application-dialog';
import { ReportApplicationsDialog } from './report-application-dialog';
import UpdateApplicationForm from './update-application-form';

export function getColumns({
  users,
}: {
  users?: ClerkUser[];
}): ColumnDef<any>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5 border-none bg-card-foreground"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5 border-none bg-card-foreground"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'code',
      meta: {
        label: 'Mã đơn',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Barcode className="mr-2 size-5 text-pink-500" />
          <DataTableColumnHeader column={column} title="Mã đơn" />
        </div>
      ),
      cell: ({ row }) => <div className="w-full">{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'receptionist',
      meta: {
        label: 'Người tiếp nhận',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <User className="mr-2 size-5 text-pink-500" />
          <DataTableColumnHeader column={column} title="Người tiếp nhận" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Badge
            className="flex w-full justify-center bg-pink-500 text-white"
            roundedType="md"
          >
            {row.getValue('receptionist')}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'acceptor',
      meta: {
        label: 'Người thụ lý',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <User className="mr-2 size-5 text-purple-500" />
          <DataTableColumnHeader column={column} title="Người thụ lý" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Badge
            className="flex w-full justify-center bg-purple-500 text-white"
            roundedType="md"
          >
            {row.getValue('acceptor') || 'Chưa thụ lý'}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },

    {
      accessorKey: 'status',
      meta: {
        label: 'Trạng thái',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <CircleDashed className="mr-2 size-5 text-green-500" />
          <DataTableColumnHeader column={column} title="Trạng thái" />
        </div>
      ),
      cell: ({ row }) => {
        switch (row.getValue('status')) {
          case 'PENDING':
            return (
              <Badge className="flex w-full justify-center bg-green-500 text-white">
                Đã tiếp nhận
              </Badge>
            );
          case 'REPORTED':
            return (
              <Badge className="flex w-full justify-center bg-yellow-500 text-white">
                Đã trình lãnh đạo
              </Badge>
            );
          case 'RESEARCHING':
            return (
              <Badge className="flex w-full justify-center bg-blue-500 text-white">
                Đang điều tra
              </Badge>
            );
          case 'COMPLETED':
            return (
              <Badge className="flex w-full justify-center bg-cyan-500 text-white">
                Hoàn tất
              </Badge>
            );
          default:
            return (
              <Badge className="flex w-full justify-center bg-gray-500 text-white">
                Không xác định
              </Badge>
            );
        }
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'fullName',
      meta: {
        label: 'Họ và tên',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <TypeOutline className="mr-2 size-5 text-orange-500" />
          <DataTableColumnHeader column={column} title="Họ và tên" />
        </div>
      ),
      cell: ({ cell }) => (
        <div className="w-full">{cell.getValue() as string}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'email',
      meta: {
        label: 'Địa chỉ E-mail',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <AtSign className="mr-2 size-5 text-cyan-500" />
          <DataTableColumnHeader column={column} title="Địa chỉ E-mail" />
        </div>
      ),
      cell: ({ row }) => <div className="w-full">{row.getValue('email')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'gender',
      meta: {
        label: 'Giới tính',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Baby className="mr-2 size-5 text-yellow-500" />
          <DataTableColumnHeader column={column} title="Giới tính" />
        </div>
      ),
      cell: ({ row }) => <div className="w-full">{row.getValue('gender')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'phoneNumber',
      meta: {
        label: 'Số điện thoại',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Phone className="mr-2 size-5 text-yellow-500" />
          <DataTableColumnHeader column={column} title="Số điện thoại" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('phoneNumber')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'occupation',
      meta: {
        label: 'Nghề nghiệp',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <BriefcaseBusiness className="mr-2 size-5 text-emerald-500" />
          <DataTableColumnHeader column={column} title="Nghề nghiệp" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('occupation')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'identityCard',
      meta: {
        label: 'Số CCCD/CMND',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <IdCard className="mr-2 size-5 text-lime-500" />
          <DataTableColumnHeader column={column} title="Số CCCD/CMND" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('identityCard')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'issueDate',
      meta: {
        label: 'Ngày cấp',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <CalendarPlus className="mr-2 size-5 text-amber-500" />
          <DataTableColumnHeader column={column} title="Ngày cấp" />
        </div>
      ),
      cell: ({ cell }) => (
        <div className="w-full">
          {dayjs(cell.getValue() as Date).format('DD/MM/YYYY')}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'placeOfIssue',
      meta: {
        label: 'Nơi cấp CCCD/CMND',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <MapPinCheck className="mr-2 size-5 text-red-500" />
          <DataTableColumnHeader column={column} title="Nơi cấp CCCD/CMND" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('placeOfIssue')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'ethnicity',
      meta: {
        label: 'Dân tộc',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <PersonStanding className="mr-2 size-5 text-teal-500" />
          <DataTableColumnHeader column={column} title="Dân tộc" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('ethnicity')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'province',
      meta: {
        label: 'Tỉnh/Thành',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <MapPinned className="mr-2 size-5 text-sky-500" />
          <DataTableColumnHeader column={column} title="Tỉnh/Thành" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('province')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'district',
      meta: {
        label: 'Quận/Huyện',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Pin className="mr-2 size-5 text-blue-500" />
          <DataTableColumnHeader column={column} title="Quận/Huyện" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('district')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'ward',
      meta: {
        label: 'Phường/Xã',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Map className="mr-2 size-5 text-indigo-500" />
          <DataTableColumnHeader column={column} title="Phường/Xã" />
        </div>
      ),
      cell: ({ row }) => <div className="w-full">{row.getValue('ward')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'address',
      meta: {
        label: 'Địa chỉ',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Navigation className="mr-2 size-5 text-violet-500" />
          <DataTableColumnHeader column={column} title="Địa chỉ" />
        </div>
      ),
      cell: ({ row }) => <div className="w-96">{row.getValue('address')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'national',
      meta: {
        label: 'Quốc tịch',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Globe className="mr-2 size-5 text-fuchsia-500" />
          <DataTableColumnHeader column={column} title="Quốc tịch" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('national')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'fieldOfApplication',
      meta: {
        label: 'Lĩnh vực đơn',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <RectangleEllipsis className="mr-2 size-5 text-red-500" />
          <DataTableColumnHeader column={column} title="Lĩnh vực đơn" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('fieldOfApplication')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'kindOfApplication',
      meta: {
        label: 'Loại đơn',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Bookmark className="mr-2 size-5 text-green-500" />
          <DataTableColumnHeader column={column} title="Loại đơn" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('kindOfApplication')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'provinceOfIncidentOccured',
      meta: {
        label: 'Tỉnh/Thành xảy ra vụ việc',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <MapPinned className="mr-2 size-5 text-sky-500" />
          <DataTableColumnHeader
            column={column}
            title="Tỉnh/Thành xảy ra vụ việc"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">
          {row.getValue('provinceOfIncidentOccured')}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'districtOfIncidentOccured',
      meta: {
        label: 'Quận/Huyện xảy ra vụ việc',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Pin className="mr-2 size-5 text-blue-500" />
          <DataTableColumnHeader
            column={column}
            title="Quận/Huyện xảy ra vụ việc"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">
          {row.getValue('districtOfIncidentOccured')}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'wardOfIncidentOccured',
      meta: {
        label: 'Phường/Xã xảy ra vụ việc',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Map className="mr-2 size-5 text-indigo-500" />
          <DataTableColumnHeader
            column={column}
            title="Phường/Xã xảy ra vụ việc"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('wardOfIncidentOccured')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'addressOfIncidentOccured',
      meta: {
        label: 'Địa chỉ xảy ra vụ việc',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <Navigation className="mr-2 size-5 text-violet-500" />
          <DataTableColumnHeader
            column={column}
            title="Địa chỉ xảy ra vụ việc"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('addressOfIncidentOccured')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'content',
      meta: {
        label: 'Nội dung',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <TableOfContents className="mr-2 size-5 text-purple-500" />
          <DataTableColumnHeader column={column} title="Nội dung" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-full">{row.getValue('content')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'contentDetail',
      meta: {
        label: 'Nội dung chi tiết',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <FileText className="mr-2 size-5 text-orange-500" />
          <DataTableColumnHeader column={column} title="Nội dung chi tiết" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-56">{row.getValue('contentDetail')}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'updatedAt',
      meta: {
        label: 'Ngày cập nhật',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <History className="mr-2 size-5 text-blue-500" />
          <DataTableColumnHeader column={column} title="Ngày cập nhật" />
        </div>
      ),
      cell: ({ cell }) => dayjs(cell.getValue() as Date).format('DD/MM/YYYY'),
    },
    {
      accessorKey: 'createdAt',
      meta: {
        label: 'Ngày tạo',
      },
      header: ({ column }) => (
        <div className="flex flex-row items-center gap-1 ">
          <AlarmClock className="mr-2 size-5 text-cyan-500" />
          <DataTableColumnHeader column={column} title="Ngày tạo" />
        </div>
      ),
      cell: ({ cell }) => dayjs(cell.getValue() as Date).format('DD/MM/YYYY'),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [showUpdateApplicationSheet, setShowUpdateApplicationSheet] =
          React.useState(false);
        const [showDeleteApplicationDialog, setShowDeleteApplicationDialog] =
          React.useState(false);
        const [showReportApplicationDialog, setShowReportApplicationDialog] =
          React.useState(false);
        const { user } = useUser();
        const [isUpdatePending, startUpdateTransition] = useTransition();
        const router = useRouter();
        const handleUpdateApplication = async (payload: any) => {
          startUpdateTransition(async () => {
            toast.promise(
              async () => {
                console.log('payload', payload);
                console.log(row.original.email);
                const { error } = await updateApplication({
                  id: row.original.id,
                  ...payload,
                });

                if (payload.status === 'COMPLETED') {
                  if (
                    row.original.email !== '' &&
                    row.original.email !== null
                  ) {
                    const html = await render(
                      InformationUpdateEmail({
                        ...row.original,
                      }),
                    );

                    await sendEmail({
                      to: row.original.email,
                      subject: 'Cập nhật trạng thái đơn',
                      html,
                    });
                  }
                }
                if (error) {
                  toast.error('Cập nhật đơn thất bại');
                }
              },
              {
                success: 'Cập nhật thành công',
                loading: 'Đang cập nhật...',
                error: 'Cập nhật thất bại',
              },
            );
          });
        };
        return (
          <>
            <UpdateDataSheet
              className="lg:w-3/5"
              open={showUpdateApplicationSheet}
              onOpenChange={setShowUpdateApplicationSheet}
              data={row.original}
              form={UpdateApplicationForm}
              name="đơn"
            />
            <DeleteApplicationsDialog
              name="đơn"
              open={showDeleteApplicationDialog}
              onOpenChange={setShowDeleteApplicationDialog}
              applications={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <ReportApplicationsDialog
              name="đơn"
              open={showReportApplicationDialog}
              onOpenChange={setShowReportApplicationDialog}
              applications={[row.original]}
              showTrigger={false}
              onSubmit={() => {
                handleUpdateApplication({
                  status: 'REPORTED',
                });
              }}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8  p-0 "
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuItem
                  className="flex items-center gap-3"
                  onSelect={() =>
                    router.replace(`/application/${row.original.id}`)
                  }
                >
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground">
                  Thao tác
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex items-center gap-3"
                  onSelect={() => setShowUpdateApplicationSheet(true)}
                >
                  <Pencil className="size-4" />
                  Sửa
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3"
                  onSelect={() => setShowDeleteApplicationDialog(true)}
                >
                  <Delete className="size-4" />
                  Xoá
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground">
                  Hành động
                </DropdownMenuLabel>

                {user?.publicMetadata.roleName === 'Cán bộ tiếp dân' && (
                  <DropdownMenuItem
                    className="flex items-center gap-3"
                    disabled={
                      row.original.status === 'REPORTED' || isUpdatePending
                    }
                    onSelect={() => {
                      setShowReportApplicationDialog(true);
                    }}
                  >
                    <Send className="size-4" />
                    Báo cáo lên lãnh đạo
                  </DropdownMenuItem>
                )}

                {user?.publicMetadata.roleName === 'Lãnh đạo' && (
                  <DropdownMenuItem
                    className="flex items-center gap-3"
                    disabled={
                      (row.original.status !== 'REPORTED' &&
                        user?.publicMetadata.roleName !== 'Lãnh đạo') ||
                      isUpdatePending
                    }
                    onSelect={() => {
                      handleUpdateApplication({
                        status: 'PENDING',
                      });
                    }}
                  >
                    <CircleX className="size-4" />
                    Từ chối đơn
                  </DropdownMenuItem>
                )}

                {user?.publicMetadata.roleName === 'Lãnh đạo' && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={
                        row.original.status !== 'REPORTED' &&
                        user?.publicMetadata.roleName !== 'Lãnh đạo'
                          ? 'cursor-not-allowed opacity-50'
                          : ''
                      }
                      disabled={
                        row.original.status !== 'REPORTED' &&
                        user?.publicMetadata.roleName !== 'Lãnh đạo'
                      }
                    >
                      Phân công kiểm sát viên
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={row.original.label}
                        onValueChange={value => {
                          handleUpdateApplication({
                            status: 'RESEARCHING',
                            acceptorId: value,
                          });
                        }}
                      >
                        {users
                          ?.filter(
                            user =>
                              user.publicMetadata.roleName === 'Kiểm sát viên',
                          )
                          .map(user => (
                            <DropdownMenuRadioItem
                              key={user.id}
                              value={user.id}
                              disabled={isUpdatePending}
                            >
                              <div className="flex flex-row items-center justify-center gap-2">
                                {(user.publicMetadata.fullName as string) ||
                                  user.username}
                                {user.id === row.original.acceptorId && (
                                  <Check className="size-4" />
                                )}
                              </div>
                            </DropdownMenuRadioItem>
                          ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}

                {user?.publicMetadata.roleName === 'Kiểm sát viên' && (
                  <DropdownMenuItem
                    className="flex items-center gap-3"
                    disabled={isUpdatePending}
                    onSelect={() => {
                      handleUpdateApplication({
                        status: 'COMPLETED',
                      });
                    }}
                  >
                    <CircleCheckBig className="size-4" />
                    Hoàn tất thụ lý
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
      size: 40,
    },
  ];
}
