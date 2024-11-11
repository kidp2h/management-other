'use server';

import { eq, inArray } from 'drizzle-orm';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import randomatic from 'randomatic';

import { db } from '@/db';
import { roles } from '@/db/schema';
import { takeFirstOrThrow } from '@/db/utils';
import { getErrorMessage } from '@/lib/handle-error';
import type {
  CreateRoleSchema,
  UpdateRoleSchema,
} from '@/lib/zod/schemas/role-schema';

export async function createRole(input: CreateRoleSchema) {
  noStore();
  try {
    // await db.transaction(async tx => {
    await db
      .insert(roles)
      .values({
        code: `RL${randomatic('A0A', 10)}${new Date().getSeconds()}${new Date().getFullYear()}`,
        name: input.name,
      })
      .returning({
        id: roles.id,
      })
      .then(takeFirstOrThrow);

    // Delete a task to keep the total number of tasks constant
    // await tx.delete(roles).where(
    //   eq(
    //     roles.id,
    //     (
    //       await tx
    //         .select({
    //           id: roles.id,
    //         })
    //         .from(roles)
    //         .limit(1)
    //         .where(not(eq(roles.id, newRole.id)))
    //         .orderBy(asc(roles.createdAt))
    //         .then(takeFirstOrThrow)
    //     ).id,
    //   ),
    // );;

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

export async function getAllRoles() {
  try {
    const data = await db.select().from(roles);
    return { data };
  } catch (error) {
    console.error('Error getting roles:', error);
    return { data: null };
  }
}

export async function deleteRole(input: { id: string }) {
  try {
    await db.delete(roles).where(eq(roles.id, input.id));

    revalidatePath('/roles');
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteRoles(input: { ids: string[] }) {
  try {
    await db.delete(roles).where(inArray(roles.id, input.ids));

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

export async function updateRole(input: UpdateRoleSchema & { id: string }) {
  noStore();
  try {
    await db
      .update(roles)
      .set({
        name: input.name,
      })
      .where(eq(roles.id, input.id));

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
