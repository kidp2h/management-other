'use server';

import { subDays, subMonths } from 'date-fns';
import { count, desc, eq, gt, inArray, sql } from 'drizzle-orm';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import randomatic from 'randomatic';

import { db } from '@/db';
import { applications } from '@/db/schema';
import { takeFirstOrThrow } from '@/db/utils';
import { getUserById } from '@/lib/clerk';
import { getErrorMessage } from '@/lib/handle-error';
import type {
  CreateApplicationSchema,
  UpdateApplicationSchema,
} from '@/lib/zod/schemas/application-schema';
import type { UploadedFile } from '@/types';

export async function createApplication(
  input: CreateApplicationSchema,
  receptionistId: string,
  files: UploadedFile[],
) {
  noStore();
  try {
    // await db.transaction(async tx => {
    if (receptionistId) {
      const urls = files.map(file => `${file.appUrl}|${file.name}`);
      console.log(urls);
      await db
        .insert(applications)
        .values({
          code: `A${randomatic('A0A', 10)}${new Date().getSeconds()}${new Date().getFullYear()}`,
          ...input,
          receptionistId,
          files: urls,
        })
        .returning({
          id: applications.id,
        })
        .then(takeFirstOrThrow);

      revalidatePath('/applications');

      return {
        data: null,
        error: null,
      };
    }
    return {
      data: null,
      error: 'Receptionist not found',
    };
  } catch (err: any) {
    console.log(err);
    return {
      data: null,
      error: getErrorMessage(err),
      code: err.code,
    };
  }
}

export async function deleteApplication(input: { id: string }) {
  try {
    await db.delete(applications).where(eq(applications.id, input.id));

    revalidatePath('/applications');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteApplications(input: { ids: string[] }) {
  try {
    await db.delete(applications).where(inArray(applications.id, input.ids));

    revalidatePath('/roles');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateApplication(
  input: Omit<Partial<UpdateApplicationSchema>, 'files'> & {
    id: string;
    files: string[];
  },
) {
  noStore();
  try {
    await db
      .update(applications)
      .set({
        ...input,
      })
      .where(eq(applications.id, input.id));

    revalidatePath('/applications');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteFilesApplication(
  input: Omit<Partial<UpdateApplicationSchema>, 'files'> & {
    id: string;
    files: string[];
  },
) {
  noStore();
  try {
    await db
      .update(applications)
      .set({
        ...input,
      })
      .where(eq(applications.id, input.id));

    revalidatePath('/applications');

    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function getCountAllApplications() {
  try {
    const data = await db
      .select({
        count: count(),
      })
      .from(applications);
    return data[0]?.count ?? 0;
  } catch (error) {
    console.error('Error getting applications:', error);
    return 0;
  }
}

type StatusTuple = typeof applications.status.enumValues;
type Status = StatusTuple[number];
export async function getCountAllApplicationsByStatus(status: Status) {
  try {
    const data = await db
      .select({
        count: count(),
      })

      .from(applications)
      .where(eq(applications.status, status));
    return data[0]?.count ?? 0;
  } catch (error) {
    console.error('Error getting applications:', error);
    return 0;
  }
}

export async function getApplicationCompletedWithResearcher() {
  try {
    const data = (await db
      .select({
        acceptorId: applications.acceptorId,
        count: count(),
      })
      .from(applications)
      .where(eq(applications.status, 'COMPLETED'))
      .groupBy(applications.acceptorId)) as Array<{
      acceptorId: string | null;
      count: number;
      acceptor?: string;
    }>;
    const promises = [];
    for (const d of data) {
      console.log(d);
      promises.push(getUserById(d?.acceptorId));
    }
    const acceptors = await Promise.all(promises);
    for (let i = 0; i < data.length; i++) {
      data[i].acceptor = acceptors[i]?.data?.publicMetadata.fullName as string;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error getting applications:', error);
    return 0;
  }
}

export async function getApplicationsRecent3Months() {
  try {
    const data = await db
      .select({
        date: sql<Date>`date_trunc('day', ${applications.createdAt})`,
        pending: sql<number>`count(case when status = 'PENDING' then 1 end)`,
        completed: sql<number>`count(case when status = 'COMPLETED' then 1 end)`,
      })
      .from(applications)
      .groupBy(sql<Date>`date_trunc('day', ${applications.createdAt})`)
      .where(gt(applications.createdAt, subMonths(new Date(), 3)));

    return data;
  } catch (error) {
    console.error('Error getting applications:', error);
    return [];
  }
}

export async function getApplicationsRecent7Days() {
  try {
    const data = await db
      .select({
        fullName: applications.fullName,
        email: applications.email,
        status: applications.status,
        phoneNumber: applications.phoneNumber,
      })

      .from(applications)
      .where(gt(applications.createdAt, subDays(new Date(), 7)))
      .orderBy(desc(applications.createdAt));

    return data;
  } catch (error) {
    console.error('Error getting applications:', error);
    return [];
  }
}
export async function getApplicationsRecent6Months() {
  try {
    const data = await db
      .select({
        date: sql<Date>`date_trunc('month', ${applications.createdAt})`,
        pending: sql<number>`count(case when status = 'PENDING' then 1 end)`,
        completed: sql<number>`count(case when status = 'COMPLETED' then 1 end)`,
      })
      .from(applications)
      .groupBy(sql<Date>`date_trunc('month', ${applications.createdAt})`)
      .where(gt(applications.createdAt, subMonths(new Date(), 6)));

    return data;
  } catch (error) {
    console.error('Error getting applications:', error);
    return [];
  }
}
