import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { profileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await profileService.getProfile(req.user!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user profile fetched successfully',
    data: result,
  });
});

export const profileController = { getProfile };
