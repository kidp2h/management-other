import React from 'react';

import { EmptyCard } from '@/components/common/empty-card';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface UploadedFilesCardProps {
  uploadedFiles: string[];
  applicationId: string;
  filesRemove: string[];
  setFilesRemove: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UploadedFilesCard({
  uploadedFiles: initUploadedFiles,
  applicationId,
  filesRemove,
  setFilesRemove,
}: UploadedFilesCardProps) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<string[]>(initUploadedFiles);
  const handleRemoveFile = async (file: string) => {
    setFilesRemove(prev => [...prev, file]);
    setUploadedFiles(prev => prev.filter(f => f !== file));
    // const newFiles = uploadedFiles.filter(f => f !== file);
    // const { error } = await deleteFilesApplication({
    //   id: applicationId,
    //   files: newFiles,
    // });
    // if (error) {
    //   toast.error('Xoá tệp thất bại!');
    // } else {
    //   toast.success('Xoá tệp thành công!');
    // }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tệp đã tải</CardTitle>
        <CardDescription>
          Xem tệp đã tải lên ở đây. Nhấn chuột trái để xoá tệp đã tải lên.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles?.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map(file => (
                <Badge
                  key={file}
                  className="cursor-pointer"
                  onClick={() => {
                    handleRemoveFile(file);
                  }}
                >
                  {file.split('|')[1]}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="Không có tệp nào"
            description="Tải lên tệp của bạn để xem ở đây"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
