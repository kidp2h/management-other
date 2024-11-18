import 'server-only';

import { and, asc, count, desc, eq, gte, lte, or, type SQL } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';

import { db } from '@/db';
import { type Applications, applications } from '@/db/schema';
import { getUserById } from '@/lib/clerk';
import { filterColumn } from '@/lib/filter-column';
import type { GetApplicationSchema } from '@/lib/zod/schemas/application-schema';
import type { DrizzleWhere } from '@/types';

import { takeFirstOrThrow } from '../utils';

export async function getApplications(input: Partial<GetApplicationSchema>) {
  noStore();

  try {
    const offset = (input.page! - 1) * input.per_page!;
    const [column, order] = (input.sort?.split('.').filter(Boolean) ?? [
      'createdAt',
      'desc',
    ]) as [keyof Applications | undefined, 'asc' | 'desc' | undefined];
    // Convert the date strings to date objects
    const fromDate = input.from ? new Date(input.from) : undefined;
    const toDate = input.to ? new Date(input.to) : undefined;

    const expressions: (SQL<unknown> | undefined)[] = [
      input.code
        ? filterColumn({
            column: applications.code,
            value: input.code,
          })
        : undefined,
      !!input.fullName
        ? filterColumn({
            column: applications.fullName,
            value: input.fullName,
          })
        : undefined,
      !!input.updatedAt
        ? and(
            gte(
              applications.updatedAt,
              new Date(input.updatedAt.split(',')[0]),
            ),
            lte(
              applications.updatedAt,
              new Date(input.updatedAt.split(',')[1]),
            ),
          )
        : undefined,
      !!input.gender
        ? filterColumn({
            column: applications.gender,
            value: input.gender,
            isSelectable: true,
          })
        : undefined,
      !!input.ethnicity
        ? filterColumn({
            column: applications.ethnicity,
            value: input.ethnicity,
            isSelectable: true,
          })
        : undefined,
      !!input.email
        ? filterColumn({ column: applications.email, value: input.email })
        : undefined,
      !!input.identityCard
        ? filterColumn({
            column: applications.identityCard,
            value: input.identityCard,
          })
        : undefined,
      !!input.phoneNumber
        ? filterColumn({
            column: applications.phoneNumber,
            value: input.phoneNumber,
          })
        : undefined,
      !!input.address
        ? filterColumn({ column: applications.address, value: input.address })
        : undefined,
      !!input.province
        ? filterColumn({
            column: applications.province,
            value: input.province,
            isSelectable: true,
          })
        : undefined,
      !!input.district
        ? filterColumn({ column: applications.district, value: input.district })
        : undefined,
      !!input.ward
        ? filterColumn({ column: applications.ward, value: input.ward })
        : undefined,
      !!input.fieldOfApplication
        ? filterColumn({
            column: applications.fieldOfApplication,
            value: input.fieldOfApplication,
            isSelectable: true,
          })
        : undefined,
      !!input.national
        ? filterColumn({
            column: applications.national,
            value: input.national,
            isSelectable: true,
          })
        : undefined,
      !!input.occupation
        ? filterColumn({
            column: applications.occupation,
            value: input.occupation,
          })
        : undefined,
      !!input.kindOfApplication
        ? filterColumn({
            column: applications.kindOfApplication,
            value: input.kindOfApplication,
            isSelectable: true,
          })
        : undefined,
      !!input.provinceOfIncidentOccured
        ? filterColumn({
            column: applications.provinceOfIncidentOccured,
            value: input.provinceOfIncidentOccured,
            isSelectable: true,
          })
        : undefined,
      !!input.districtOfIncidentOccured
        ? filterColumn({
            column: applications.districtOfIncidentOccured,
            value: input.districtOfIncidentOccured,
          })
        : undefined,
      !!input.wardOfIncidentOccured
        ? filterColumn({
            column: applications.wardOfIncidentOccured,
            value: input.wardOfIncidentOccured,
          })
        : undefined,
      !!input.addressOfIncidentOccured
        ? filterColumn({
            column: applications.addressOfIncidentOccured,
            value: input.addressOfIncidentOccured,
          })
        : undefined,
      !!input.acceptor
        ? filterColumn({
            column: applications.acceptorId,
            value: input.acceptor,
            isSelectable: true,
          })
        : undefined,
      !!input.status
        ? filterColumn({
            column: applications.status,
            value: input.status,
            isSelectable: true,
          })
        : undefined,
      !!input.content
        ? filterColumn({ column: applications.content, value: input.content })
        : undefined,
      !!input.contentDetail
        ? filterColumn({
            column: applications.contentDetail,
            value: input.contentDetail,
          })
        : undefined,

      fromDate ? gte(applications.createdAt, fromDate) : undefined,
      toDate ? lte(applications.createdAt, toDate) : undefined,
    ];
    const where: DrizzleWhere<Applications> =
      !input.operator || input.operator === 'and'
        ? and(...expressions)
        : or(...expressions);
    const { data, total } = await db.transaction(async tx => {
      const data: any = await tx
        .select()
        .from(applications)
        .limit(input.per_page!)
        .offset(offset)
        .where(where)
        .orderBy(
          column && column in applications
            ? order === 'asc'
              ? asc(applications[column])
              : desc(applications[column])
            : desc(applications.id),
        );
      const total = await tx
        .select({
          count: count(),
        })
        .from(applications)
        .where(where)
        .execute()
        .then(res => res[0]?.count ?? 0);
      const promises = [];
      for (const d of data) {
        // console.log(d);
        promises.push(getUserById(d?.acceptorId));
        promises.push(getUserById(d?.receptionistId));
        // const [acceptor, receptionist] = await Promise.all(promises);
        // (
        //   d as unknown as typeof data & {
        //     acceptor: string;
        //     receptionist: string;
        //   }
        // ).acceptor =
        //   (acceptor?.data?.publicMetadata.fullName as string) ||
        //   acceptor?.data?.username ||
        //   '';

        // (
        //   d as unknown as typeof data & {
        //     acceptor: string;
        //     receptionist: string;
        //   }
        // ).receptionist =
        //   (receptionist?.data?.publicMetadata.fullName as string) ||
        //   receptionist?.data?.username ||
        //   '';
      }

      const users = await Promise.all(promises);
      for (let i = 0; i < data.length; i += 2) {
        // (data[i] as any).acceptor = '';
        // (data[i + 1] as any).receptionist = '';
        if (data[i + 1] !== undefined) {
          data[i + 1] = {
            ...data[i + 1],
            acceptor: users[i]?.data?.publicMetadata.fullName as string,
            receptionist:
              (users[i + 1]?.data?.publicMetadata.fullName as string) || '',
          };
        }

        data[i] = {
          ...data[i],
          acceptor: users[i]?.data?.publicMetadata.fullName as string,
          receptionist:
            (users[i + 1]?.data?.publicMetadata.fullName as string) || '',
        };
      }
      return {
        data,
        total,
      };
    });

    const pageCount = Math.ceil(total / input.per_page!);
    return { data, pageCount };
  } catch (error) {
    console.error('Error getting applications:', error);
    return { data: [], pageCount: 0 };
  }
}

export async function getAllRoles() {
  try {
    const data = await db.select().from(applications);
    return { data };
  } catch (error) {
    console.error('Error getting applications:', error);
    return { data: null };
  }
}

export async function getApplicationById(id: string) {
  try {
    const data = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id))
      .then(takeFirstOrThrow);
    return { data };
  } catch (error) {
    console.error('Error getting applications:', error);
    return { data: null };
  }
}
