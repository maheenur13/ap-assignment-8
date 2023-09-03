import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
    include: {
      orderedBooks: true,
      user: true,
    },
  });
  return result;
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
