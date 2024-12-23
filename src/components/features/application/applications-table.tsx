'use client';

import { useUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/server';
import React, { use, useEffect } from 'react';
import { toast } from 'sonner';

import { CreateDataDialog } from '@/components/common/create-data-dialog';
import { DataTableToolbarActions } from '@/components/common/data-table-toolbar-actions';
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { createApplication } from '@/db/actions/applications';
import type { getApplications } from '@/db/queries/applications';
import { type Applications, applications, enumStatusMapped } from '@/db/schema';
import { useDataTable } from '@/hooks/use-data-table';
import {
  fieldOfApplication,
  kindOfApplication,
  nationalities,
} from '@/lib/zod/schemas/application-schema';
import { useGlobalStore } from '@/providers/global-store-provider';
import { useTable } from '@/providers/table-provider';
import type { DataTableFilterField } from '@/types';

import { getColumns } from './applications-table-column';
import CreateApplicationForm from './create-application-form';
import { DeleteApplicationsDialog } from './delete-application-dialog';

interface ApplicationsTableProps {
  applications: ReturnType<typeof getApplications>;
  users: User[];
}
export const ApplicationsTable = ({
  applications: _applications,
  users,
}: ApplicationsTableProps) => {
  const { data, pageCount } = use(_applications);
  const { setUsers, users: u } = useGlobalStore(state => state);
  useEffect(() => {
    setUsers(users);
  }, [u, setUsers, users]);
  const columns = getColumns({ users });

  const { featureFlags } = useTable();
  const { user } = useUser();
  const { provinces } = useGlobalStore(state => state);

  const filterFieldsText: DataTableFilterField<any>[] = [
    {
      label: 'Họ và tên',
      value: 'fullName',
      placeholder: 'Tìm kiếm theo họ và tên',
    },
    {
      label: 'Mã đơn',
      value: 'code',
      placeholder: 'Tìm kiếm theo mã đơn',
    },
    {
      label: 'Địa chỉ E-mail',
      value: 'email',
      placeholder: 'Tìm kiếm theo địa chỉ E-mail',
    },
    {
      label: 'Số điện thoại',
      value: 'phoneNumber',
      placeholder: 'Tìm kiếm theo số điện thoại',
    },
    {
      label: 'Địa chỉ',
      value: 'address',
      placeholder: 'Tìm kiếm theo địa chỉ',
    },
    {
      label: 'CCCD/CMND',
      value: 'identityCard',
      placeholder: 'Tìm kiếm theo số CCCD/CMND',
    },
  ];
  let filterFieldsBox: DataTableFilterField<any>[] = [];
  if (user?.publicMetadata.roleName === 'Lãnh đạo') {
    filterFieldsBox = [
      {
        label: 'Dân tộc',
        value: 'ethnicity',
        options: applications.ethnicity.enumValues.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Giới tính',
        value: 'gender',
        options: ['Nam', 'Nữ', 'Khác'].map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Lĩnh vực',
        value: 'fieldOfApplication',
        options: fieldOfApplication.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Quốc tịch',
        value: 'national',
        options: nationalities.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Loại đơn',
        value: 'kindOfApplication',
        options: kindOfApplication.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Tỉnh/Thành',
        value: 'province',
        options: provinces.map(p => ({
          label: p.name,
          value: p.name,
          withCount: false,
        })),
      },
      {
        label: 'Tỉnh/Thành xảy ra vụ việc',
        value: 'provinceOfIncidentOccured',
        options: provinces.map(p => ({
          label: p.name,
          value: p.name,
          withCount: false,
        })),
      },
      {
        label: 'Người thụ lý',
        value: 'acceptor',
        options: users.map(p => ({
          label: String(p.publicMetadata.fullName),
          value: p.id,
          valueCount: String(p.publicMetadata.fullName),
          withCount: true,
        })),
      },
      {
        label: 'Trạng thái',
        value: 'status',
        options: applications.status.enumValues.map(type => ({
          label: enumStatusMapped[type],
          value: type,
          withCount: true,
        })),
      },
      {
        label: 'Thời gian tạo',
        value: 'updatedAt',
        isDate: true,
      },
    ];
  } else {
    filterFieldsBox = [
      {
        label: 'Dân tộc',
        value: 'ethnicity',
        options: applications.ethnicity.enumValues.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Giới tính',
        value: 'gender',
        options: ['Nam', 'Nữ', 'Khác'].map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Lĩnh vực',
        value: 'fieldOfApplication',
        options: fieldOfApplication.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Quốc tịch',
        value: 'national',
        options: nationalities.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Loại đơn',
        value: 'kindOfApplication',
        options: kindOfApplication.map(type => ({
          label: type[0]?.toUpperCase() + type.slice(1),
          value: type,
          withCount: false,
        })),
      },
      {
        label: 'Tỉnh/Thành',
        value: 'province',
        options: provinces.map(p => ({
          label: p.name,
          value: p.name,
          withCount: false,
        })),
      },
      {
        label: 'Tỉnh/Thành xảy ra vụ việc',
        value: 'provinceOfIncidentOccured',
        options: provinces.map(p => ({
          label: p.name,
          value: p.name,
          withCount: false,
        })),
      },

      {
        label: 'Trạng thái',
        value: 'status',
        options: applications.status.enumValues.map(type => ({
          label: enumStatusMapped[type],
          value: type,
          withCount: true,
        })),
      },
      {
        label: 'Thời gian tạo',
        value: 'updatedAt',
        isDate: true,
      },
    ];
  }

  // const Toolbar = featureFlags.includes('advancedFilter')
  //   ? DataTableAdvancedToolbar
  //   : DataTableToolbar;

  const { table } = useDataTable({
    data: data.filter((application: any) => {
      switch (user?.publicMetadata.roleName) {
        case 'Lãnh đạo':
          return true;
        case 'Kiểm sát viên':
          // return (
          //   application.status === 'RESEARCHING'
          //
          // );
          return (
            application.status === 'PENDING' ||
            (application.status === 'RESEARCHING' &&
              application.acceptorId === user.id)
          );
        case 'Cán bộ tiếp dân':
          return application.status === 'PENDING';
        default:
          return false;
      }
    }),
    columns,
    enableAdvancedFilter: featureFlags.includes('advancedFilter'),
    pageCount,
    filterFields: [...filterFieldsText, ...filterFieldsBox],
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'], left: ['select'] },
    },
    shallow: false,
    clearOnDefault: true,
  });
  return (
    <DataTable table={table}>
      <DataTableToolbarActions<Applications>
        table={table}
        handleImport={async data => {
          const promises = [];
          for (const d of data) {
            const [day, month, year] = d[7].split('/');
            const payload = {
              fullName: d[0],
              email: d[1],
              identityCard: d[5],
              issueDate: new Date(+year, +month - 1, +day),
              placeOfIssue: d[6],
              gender: d[3],
              phoneNumber: d[8],
              ethnicity: d[4],
              address: d[13],
              province: d[10],
              district: d[11],
              ward: d[12],
              national: d[9],
              occupation: d[2],
              kindOfApplication: d[14],
              fieldOfApplication: d[15],
              provinceOfIncidentOccured: d[17],
              districtOfIncidentOccured: d[18],
              wardOfIncidentOccured: d[19],
              addressOfIncidentOccured: d[20],
              content: d[16],
              contentDetail: d[21],
              objectsOfApplication: d[22],
            };
            console.log(payload);
            const application = createApplication(payload, user?.id || '', []);
            promises.push(application);
          }
          const results = await Promise.all(promises);
          const errors = results.filter(result => result.error !== null);
          toast(`${results.length - errors.length} đơn đã được tạo!`);
          if (errors.length > 0)
            toast(`${errors.length} đơn bị trùng thông tin không thể tạo!`);
        }}
        fileNameExport="applications"
        createDialog={
          <CreateDataDialog
            form={CreateApplicationForm}
            name="Đơn"
            description="Tạo đơn mới"
          />
        }
        deleteDialog={
          <DeleteApplicationsDialog
            name="đơn"
            applications={table
              .getFilteredSelectedRowModel()
              .rows.map(row => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
        }
      />
      <DataTableAdvancedToolbar
        table={table}
        filterFields={filterFieldsText}
        btnView={false}
      >
        <DataTableToolbar
          table={table}
          filterFields={filterFieldsBox}
          btnView
        />
      </DataTableAdvancedToolbar>
    </DataTable>
  );
};
