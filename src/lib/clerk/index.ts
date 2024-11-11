'use server';
import { clerkClient, type User } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import type {
  CreateUserSchema,
  UpdateUserSchema,
} from '@/lib/zod/schemas/user-schema';

export const getUserById = async (id: string | null) => {
  try {
    if (id === null)
      return {
        data: null,
        error: null,
      };
    const data = await clerkClient().users.getUser(id);
    if (data) {
      return {
        data,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const createUser = async (
  input: Partial<CreateUserSchema> & { metadata?: Record<string, string> },
) => {
  try {
    const data = await clerkClient().users.createUser({
      username: input.username,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,

      publicMetadata: {
        ...input.metadata,
      },
    });

    if (data) {
      revalidatePath('/users');
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error,
    };
  }
};

export const deleteUser = async (input: { id: string }) => {
  try {
    const data = await clerkClient().users.deleteUser(input.id);
    if (data) {
      revalidatePath('/users');
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const deleteUsers = async (input: { ids: string[] }) => {
  try {
    const list: Promise<User>[] = [];
    for (const id of input.ids) {
      list.push(clerkClient().users.deleteUser(id));
    }
    const data = await Promise.all(list);
    if (data) {
      revalidatePath('/users');
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const updateUser = async (
  input: Partial<UpdateUserSchema> & {
    id: string;
    metadata?: Record<string, string>;
  },
) => {
  try {
    // const newData = {} as Record<string, string>;
    // if (input.username) newData.username = input.username;
    // if (input.password) newData.password = input.password;
    const data = await clerkClient().users.updateUser(input.id, {
      ...input,
      publicMetadata: {
        ...input.metadata,
      },
      skipPasswordChecks: true,
    });

    if (data) {
      revalidatePath('/users');
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const updateMetadataUser = async (
  id: string,
  metadata: Record<string, any>,
) => {
  try {
    const data = await clerkClient().users.updateUserMetadata(id, {
      publicMetadata: {
        ...metadata,
      },
    });
    if (data) {
      revalidatePath('/users');
      return {
        data: null,
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
