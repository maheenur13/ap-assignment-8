import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {
  IOrderBook,
  IOrderBookPayload,
  IUserDetails,
} from './order.interfaces';
import ApiError from '../../../errors/ApiError';
import { asyncForEach } from '../../../shared/utils';
import httpStatus from 'http-status';

const createOrder = async (
  data: IOrderBookPayload,
  userData: IUserDetails
): Promise<Order | null> => {
  const orderDetails = await prisma.$transaction(async transactionClient => {
    const orderedInfo = {
      userId: userData.userId,
    };

    const order = await prisma.order.create({
      data: orderedInfo,
    });

    if (!order) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create order!');
    }

    await asyncForEach(data.orderedBooks, async (orderBook: IOrderBook) => {
      await transactionClient.orderedBook.create({
        data: {
          quantity: orderBook.quantity,
          bookId: orderBook.bookId,
          orderId: order.id,
        },
      });
    });

    return order;
  });

  const order = await prisma.order.findUnique({
    where: {
      id: orderDetails.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return order;
};

const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
      user: true,
    },
  });

  return result;
};

const getSingleOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
      user: true,
    },
  });
  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
