import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { exclude } from '../../../shared/utils';
import { ILoginUser, ILoginUserResponse } from './auth.interfaces';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const signIn = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && password !== isUserExist.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token and refresh token
  const { id: userId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, iat: Math.floor(Date.now() / 1000) },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

const signup = async (data: User): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user already exist');
  }

  const result = await prisma.user.create({
    data,
  });

  const userWithoutPassword = exclude(result, ['password']);

  return userWithoutPassword;
};

export const authService = { signup, signIn };
