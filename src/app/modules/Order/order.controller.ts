import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all orders fetched successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getSingleOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order fetched successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
