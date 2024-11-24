'use client';

// eslint-disable-next-line simple-import-sort/imports
import type { Table } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import React from 'react';
import * as XLSX from 'xlsx';

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
} from '@/components/ui/dialog';
import { exportTableToCSV } from '@/lib/export';

interface DataTableToolbarActionsProps<T> {
  table: Table<T>;
  fileNameExport: string;
  createDialog: React.ReactNode;
  deleteDialog: React.ReactNode;
  handleImport?: (data: any) => void;
}
export function DataTableToolbarActions<T>({
  table,
  fileNameExport,
  deleteDialog,
  createDialog,
  handleImport,
}: DataTableToolbarActionsProps<T>) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const handleImportExcel = () => {
    ref.current?.click();
  };

  const handleFile = async (file: File | undefined) => {
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, {
        type: 'binary',
        cellDates: true,
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: '',
        dateNF: 'dd/mm/yyyy hh:mm:ss',
        raw: false,
      });
      console.log(jsonData);
      jsonData.splice(0, 1);
      handleImport?.(jsonData);
    }
  };
  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFile(file);
    setOpen(true);
  };
  const [isImportPending, startImportTransition] = React.useTransition();

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0
        ? deleteDialog
        : null}
      {/* {<CreateDataDialog
        form={CreateReligionForm}
        name={name}
        description={`Tạo mới ${name}`}
      />} */}
      {createDialog}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn không?</DialogTitle>
            <DialogDescription>
              Bạn đang nhập dữ liệu từ file Excel, hành động này không thể hoàn
              tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={async () => {
                await handleFile(file);
                setOpen(false);
              }}
              disabled={isImportPending}
            >
              {isImportPending && (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: fileNameExport,
            excludeColumns: ['select', 'actions'],
          })
        }
      >
        <Download className="mr-2 size-4" aria-hidden="true" />
        Xuất tệp Excel
      </Button>
      {handleImport && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleImportExcel()}
          >
            <Download className="mr-2 size-4" aria-hidden="true" />
            Nhập tệp Excel
          </Button>
          <input
            type="file"
            ref={ref}
            className="hidden"
            onInput={onFileUpload}
          />
        </>
      )}
    </div>
  );
}
