'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import * as React from 'react';

import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { DataTableFilterField } from '@/types';

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
  btnView?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  btnView = true,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns, pickerableColumns } =
    React.useMemo(() => {
      return {
        searchableColumns: filterFields.filter(
          field => !field.options && !field.isDate,
        ),
        filterableColumns: filterFields.filter(
          field => field.options && !field.isDate,
        ),
        pickerableColumns: filterFields.filter(field => field.isDate),
      };
    }, [filterFields]);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between space-x-2 overflow-auto py-2',
        className,
      )}
      {...props}
    >
      {isFiltered && (
        <Button
          aria-label="Reset filters"
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => table.resetColumnFilters()}
        >
          Đặt lại
          <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
        </Button>
      )}
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            column =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <Input
                  key={String(column.value)}
                  placeholder={column.placeholder}
                  startIcon={Search}
                  value={
                    (table
                      .getColumn(String(column.value))
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={event =>
                    table
                      .getColumn(String(column.value))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-10 w-40 focus-visible:ring-transparent lg:w-64"
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            column =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : '',
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              ),
          )}
        {pickerableColumns.length > 0 &&
          pickerableColumns.map(
            column =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : '',
                  )}
                  isDate
                  title={column.label}
                  options={column.options ?? []}
                />
              ),
          )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {btnView && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
