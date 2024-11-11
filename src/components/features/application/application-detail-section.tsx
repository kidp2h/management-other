'use client';
import DocViewer from '@cyntler/react-doc-viewer';
import dayjs from 'dayjs';
import { Download, File } from 'lucide-react';
import React from 'react';

import AutoBreadcrumb from '@/components/common/auto-breadcrumb';
import MainContent from '@/components/common/main-content';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentLayout } from '@/layouts';
import { getFileExt, isImage } from '@/lib/utils';

export interface ApplicationDetailSectionProps {
  application: any;
}
export default function ApplicationDetailSection({
  application,
}: ApplicationDetailSectionProps) {
  const items = [
    { name: 'Trang chủ', href: '/' },
    { isSeparator: true },
    { name: 'Quản lý đơn', href: '/applications' },
    { isSeparator: true },
    { name: 'Chi tiết đơn' },
  ];
  return (
    <ContentLayout title="Vai trò">
      <AutoBreadcrumb items={items} />
      <MainContent hasCard={false}>
        <Tabs defaultValue="files" className="w-3/4">
          <TabsList>
            <TabsTrigger value="information">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="files">Tệp bổ sung</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-row items-center  gap-5">
                <span>Mã đơn</span>
                <Badge>{application.id}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Mã đơn</span>
                <Badge>{application.id}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Trạng thái</span>
                <Badge>
                  {application.status === 'PENDING' && 'Đã tiếp nhận'}
                  {application.status === 'REPORTED' && 'Đã trình lãnh đạo'}
                  {application.status === 'RESEARCHING' && 'Đang điều tra'}
                  {application.status === 'COMPLETED' && 'Hoàn tất'}
                </Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Họ và tên</span>
                <Badge>{application.fullName}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Địa chỉ e-mail</span>
                <Badge>{application.email}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Giới tính</span>
                <Badge>{application.gender}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Số điện thoại</span>
                <Badge>{application.phoneNumber}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Nghề nghiệp</span>
                <Badge>{application.occupation}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>CCCD/CMT</span>
                <Badge>{application.identityCard}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Ngày cấp CCCD/CMT</span>
                <Badge>
                  {dayjs(application.issueDate).format('DD-MM-YYYY')}
                </Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Nơi cấp</span>
                <Badge>{application.placeOfIssue}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Dân tộc</span>
                <Badge>{application.ethnicity}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Tỉnh/Thành</span>
                <Badge>{application.province}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Quận/Huyện</span>
                <Badge>{application.district}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Phường/Xã</span>
                <Badge>{application.ward}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Địa chỉ</span>
                <Badge>{application.address}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Quốc tịch</span>
                <Badge>{application.national}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Loại đơn</span>
                <Badge>{application.kindOfApplication}</Badge>
              </div>
              <div className="flex flex-row items-center gap-5">
                <span>Lĩnh vực đơn</span>
                <Badge>{application.fieldOfApplication}</Badge>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="files">
            <div className="flex flex-col gap-10">
              {application.files?.map((file: string) => {
                const path = file.split('|')[0];
                const name = file.split('|')[1];
                return (
                  <div key={name}>
                    <div className="flex w-[300px] flex-wrap items-center gap-3 rounded-md border">
                      <div className="rounded-md bg-muted p-4">
                        <File className=" size-6  " />
                      </div>
                      <span>
                        {name.length > 10
                          ? `${name.slice(0, 10)}....${getFileExt(name)}`
                          : name}
                      </span>
                      <div
                        className="ml-auto cursor-pointer rounded-md p-4"
                        onClick={() => {
                          window.open(path, 'download');
                        }}
                      >
                        <Download className=" size-5  " />
                      </div>
                    </div>
                    {isImage(name) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={path}
                        alt={name}
                        className="mt-5 rounded-md border p-20"
                      />
                    ) : (
                      <div className="mt-5 h-screen w-full rounded-md border p-20">
                        <DocViewer
                          key={name}
                          className="h-screen"
                          documents={[
                            { uri: path, fileType: getFileExt(name) },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </MainContent>
    </ContentLayout>
  );
}
