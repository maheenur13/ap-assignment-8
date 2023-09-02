import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { exclude } from '../../../shared/utils';

const signup = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
  });

  const userWithoutPassword = exclude(result, ['password']);

  return userWithoutPassword;
};

export const authService = { signup };
