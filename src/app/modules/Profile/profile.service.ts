import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';

const getProfile = async (userDetails: JwtPayload): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userDetails.userId,
    },
  });

  return result;
};

export const profileService = { getProfile };
