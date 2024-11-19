import type { SQL } from 'drizzle-orm';
import type { ClientUploadedFileData } from 'uploadthing/types';

import type { DataTableConfig } from '@/config/data-table';

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  key?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isBoolean?: boolean;
  valueCount?: any;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  key?: string;
  description?: string;
  isDate?: boolean;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  key?: string;
  description?: string;
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type FeatureFlagValue = DataTableConfig['featureFlags'][number]['value'];

export enum ClerkCode {
  NOT_FOUND = 'form_identifier_not_found',
  INVALID_PASSWORD = 'form_password_validation_failed',
}
export type DrizzleWhere<T> =
  | SQL<unknown>
  | ((aliases: T) => SQL<T> | undefined)
  | undefined;

export enum Role {
  RECEPTIONIST = 'RECEPTIONIST',
  PROSECUTOR = 'PROSECUTOR',
  LEADER = 'LEADER',
}

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
