'use client';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Expand } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { createApplication } from '@/db/actions/applications';
import { cn } from '@/lib/utils';
import {
  type CreateApplicationSchema,
  createApplicationSchema,
  ethnicities,
  fieldOfApplication,
  kindOfApplication,
  nationalities,
  objectsOfApplication,
} from '@/lib/zod/schemas/application-schema';
import { useGlobalStore } from '@/providers/global-store-provider';

export interface ApplicationFormProps {
  isDialog?: boolean;
  defaultValues?: CreateApplicationSchema;
}

export default function ApplicationForm({ isDialog }: ApplicationFormProps) {
  const form = useForm<CreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {},
  });
  const { fetchProvinces, provinces } = useGlobalStore(state => state);
  const [province, setProvince] = React.useState();
  const [district, setDistrict] = React.useState();
  const [, setWard] = React.useState();
  const { userId } = useAuth();
  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);
  const onSubmit = async (values: CreateApplicationSchema) => {
    try {
      if (userId) {
        const { error } = await createApplication(values, userId, []);
        console.log('error', error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Collapsible defaultOpen>
            management
            <CollapsibleTrigger className="mb-3 flex w-full flex-row items-center justify-between rounded-md bg-muted p-2 text-card-foreground">
              Thông tin đối tượng khiếu nại, tố cáo
              <Expand className="size-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent px-5">
              <FormField
                control={form.control}
                name="objectsOfApplication"
                render={({ field }) => (
                  <FormItem className="mb-10 flex flex-col gap-5 space-y-0 md:flex-row md:items-center">
                    <FormLabel>Đối tượng khiếu nại</FormLabel>
                    <FormControl className="space-x-0 space-y-0">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        tabIndex={0}
                        className="flex flex-row gap-4 "
                      >
                        {objectsOfApplication.map(item => (
                          <FormItem
                            key={item}
                            className="flex items-center justify-center gap-1.5 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    management
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={cn(
                  'gap-2',
                  isDialog
                    ? 'grid-cols-1'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5',
                )}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Họ và tên"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Địa chỉ e-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Địa chỉ e-mail"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Nghề nghiệp</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nghề nghiệp"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn(
                    'gap-2',
                    isDialog
                      ? 'grid-cols-1'
                      : 'col-span-1 row-start-2 grid grid-cols-1 gap-2 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3',
                  )}
                >
                  <FormField
                    control={form.control}
                    name="identityCard"
                    render={({ field }) => (
                      <FormItem className="w-full pb-3">
                        <FormLabel>Số CCCD/CMND</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Số CCCD/CMND"
                            type="number"
                            min={0}
                            className="w-full"
                            max={999999999999}
                            pattern="[0-9]*"
                            onInput={e => {
                              const input = e.target as HTMLInputElement;
                              input.value = input.value.replace(/\D/g, '');
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="placeOfIssue"
                    render={({ field }) => (
                      <FormItem className="pb-3 ">
                        <FormLabel>Nơi cấp</FormLabel>
                        <Combobox
                          type="form"
                          form={form}
                          placeholder="Nơi cấp"
                          field={field}
                          className="w-full"
                          fieldName="placeOfIssue"
                          dataset={provinces.map(province => ({
                            label: province.name,
                            value: province.name,
                          }))}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem className="pb-3 md:col-span-full lg:col-span-1">
                        <FormLabel>Ngày cấp</FormLabel>
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                          placeholder="Ngày cấp"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Giới tính</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Giới tính"
                        field={field}
                        className="w-full"
                        fieldName="gender"
                        dataset={[
                          { label: 'Nam', value: 'Nam' },
                          { label: 'Nữ', value: 'Nữ' },
                          {
                            label: 'Khác',
                            value: 'Khác',
                          },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ethnicity"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Dân tộc</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Dân tộc"
                        field={field}
                        className="w-full"
                        fieldName="ethnicity"
                        dataset={ethnicities.map(val => ({
                          label: val,
                          value: val,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Điện thoại</FormLabel>
                      <PhoneInput
                        {...field}
                        className="w-full"
                        defaultCountry="VN"
                        placeholder="Số điện thoại"
                        international
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="national"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Quốc tịch</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Quốc tịch"
                        field={field}
                        className="ml-auto"
                        fieldName="national"
                        dataset={nationalities.map(val => ({
                          label: val,
                          value: val,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Tỉnh/Thành</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Tỉnh/Thành"
                        field={field}
                        className="w-full"
                        fieldName="province"
                        setValue={setProvince}
                        dataset={provinces.map(province => ({
                          label: province.name,
                          value: province.name,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Quận/Huyện</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Quận/Huyện"
                        field={field}
                        setValue={setDistrict}
                        className="w-full"
                        fieldName="district"
                        dataset={
                          provinces
                            .filter(_province => _province.name === province)[0]
                            ?.districts.map((district: any) => ({
                              label: district.name,
                              value: district.name,
                            })) || []
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Phường/Xã</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Phường/Xã"
                        field={field}
                        className="w-full"
                        setValue={setWard}
                        fieldName="ward"
                        dataset={
                          provinces
                            .filter(_province => _province.name === province)[0]
                            ?.districts.filter(
                              (_district: any) => _district.name === district,
                            )[0]
                            ?.wards.map((ward: any) => ({
                              label: ward.name,
                              value: ward.name,
                            })) || []
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="pb-3 md:col-span-full lg:col-span-3 xl:col-span-2">
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Địa chỉ"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible defaultOpen>
            <CollapsibleTrigger className="mb-3 flex w-full flex-row items-center justify-between rounded-lg bg-muted p-2 text-card-foreground">
              Thông tin đơn thư
              <Expand className="size-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent px-5 ">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2   xl:grid-cols-3">
                {/* <div className="col-span-3 row-start-2"> */}
                <div className="row-start-1 mb-5 text-xl font-bold">
                  Phân loại vụ việc
                </div>

                <FormField
                  control={form.control}
                  name="kindOfApplication"
                  render={({ field }) => (
                    <FormItem className="row-start-2 pb-3 md:row-start-2">
                      <FormLabel>Loại đơn</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Loại đơn"
                        field={field}
                        className="w-full"
                        fieldName="kindOfApplication"
                        dataset={kindOfApplication.map(val => ({
                          label: val,
                          value: val,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fieldOfApplication"
                  render={({ field }) => (
                    <FormItem className="row-start-3 pb-3 md:row-start-2">
                      <FormLabel>Lĩnh vực</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Lĩnh vực"
                        field={field}
                        className="w-full"
                        fieldName="fieldOfApplication"
                        dataset={fieldOfApplication.map(val => ({
                          label: val,
                          value: val,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="row-start-4 pb-3 md:col-span-2 md:row-start-3 xl:row-start-2">
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nội dung"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="row-start-5 mb-5 text-xl font-bold">
                  Nơi phát sinh vụ việc
                </div>

                <FormField
                  control={form.control}
                  name="provinceOfIncidentOccured"
                  render={({ field }) => (
                    <FormItem className="row-start-6 pb-3">
                      <FormLabel>Tỉnh/Thành</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Tỉnh/Thành"
                        field={field}
                        className="w-full"
                        fieldName="provinceOfIncidentOccured"
                        setValue={setProvince}
                        dataset={provinces.map(province => ({
                          label: province.name,
                          value: province.name,
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="districtOfIncidentOccured"
                  render={({ field }) => (
                    <FormItem className="row-start-7 pb-3 md:row-start-6">
                      <FormLabel>Quận/Huyện</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Quận/Huyện"
                        field={field}
                        setValue={setDistrict}
                        className="w-full"
                        fieldName="districtOfIncidentOccured"
                        dataset={
                          provinces
                            .filter(_province => _province.name === province)[0]
                            ?.districts.map((district: any) => ({
                              label: district.name,
                              value: district.name,
                            })) || []
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wardOfIncidentOccured"
                  render={({ field }) => (
                    <FormItem className="row-start-8 pb-3 md:row-start-7 xl:row-start-6">
                      <FormLabel>Phường/Xã</FormLabel>
                      <Combobox
                        type="form"
                        form={form}
                        placeholder="Phường/Xã"
                        field={field}
                        className="w-full"
                        setValue={setWard}
                        fieldName="wardOfIncidentOccured"
                        dataset={
                          provinces
                            .filter(_province => _province.name === province)[0]
                            ?.districts.filter(
                              (_district: any) => _district.name === district,
                            )[0]
                            ?.wards.map((ward: any) => ({
                              label: ward.name,
                              value: ward.name,
                            })) || []
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressOfIncidentOccured"
                  render={({ field }) => (
                    <FormItem className="row-start-9 pb-3 md:row-start-7 xl:col-span-full">
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Địa chỉ"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentDetail"
                  render={({ field }) => (
                    <FormItem className="row-start-10 pb-3 md:col-span-full">
                      <FormLabel>Nội dung chi tiết</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nội dung chi tiết"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* </div> */}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Button type="submit" className={cn(isDialog ? 'w-full' : '')}>
            Tạo đơn
          </Button>
        </form>
      </Form>
    </div>
  );
}
