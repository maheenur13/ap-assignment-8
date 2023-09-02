import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const signup = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const authService = { signup };
