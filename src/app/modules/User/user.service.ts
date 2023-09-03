import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      address: true,
      contactNo: true,
      email: true,
      id: true,
      name: true,
      profileImg: true,
      role: true,
      password: false,
    },
  });

  return result;
};

const getAllUser = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: {
      address: true,
      contactNo: true,
      email: true,
      id: true,
      name: true,
      profileImg: true,
      role: true,
      password: false,
    },
  });

  return result;
};

const deleteUser = async (id: string): Promise<Partial<User>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      address: true,
      contactNo: true,
      email: true,
      id: true,
      name: true,
      profileImg: true,
      role: true,
      password: false,
    },
  });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },

    data: payload,
    select: {
      address: true,
      contactNo: true,
      email: true,
      id: true,
      name: true,
      profileImg: true,
      role: true,
      password: false,
    },
  });

  return result;
};

export const userService = {
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUser,
};
