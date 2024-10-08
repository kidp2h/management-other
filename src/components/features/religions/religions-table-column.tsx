import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { UpdateDataSheet } from '@/components/common/update-data-sheet';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DeleteReligionsDialog } from './delete-religion-dialog';
import UpdateReligionForm from './update-religion-form';

export function getColumns(): ColumnDef<any>[] {
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
        label: 'Mã tôn giáo',
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã tôn giáo" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'name',
      meta: {
        label: 'Tên tôn giáo',
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên tôn giáo" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('name')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'createdAt',
      meta: {
        label: 'Ngày tạo',
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ cell }) =>
        dayjs(cell.getValue() as Date).format('Ngày D MMMM, YYYY'),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [showUpdateReligionSheet, setShowUpdateReligionSheet] =
          React.useState(false);
        const [showDeleteReligionDialog, setShowDeleteReligionDialog] =
          React.useState(false);
        React.useEffect(() => {
          // document.body.classList.remove('pointer-events-none');
        });
        return (
          <>
            <UpdateDataSheet
              open={showUpdateReligionSheet}
              onOpenChange={setShowUpdateReligionSheet}
              data={row.original}
              form={UpdateReligionForm}
              name="tôn giáo"
              fieldConfig={{
                name: {
                  inputProps: {
                    type: 'text',
                    placeholder: row.original.name,
                  },
                },
                code: {
                  inputProps: {
                    type: 'text',
                    placeholder: row.original.code,
                  },
                },
              }}
            />
            <DeleteReligionsDialog
              name="tôn giáo"
              open={showDeleteReligionDialog}
              onOpenChange={setShowDeleteReligionDialog}
              religions={[row.original]}
              showTrigger={false}
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
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onSelect={() => setShowUpdateReligionSheet(true)}
                >
                  Sửa
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={() => setShowDeleteReligionDialog(true)}
                >
                  Xoá
                  {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
      size: 40,
    },
  ];
}