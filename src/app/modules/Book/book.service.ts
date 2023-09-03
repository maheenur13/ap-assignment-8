import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBookFilters } from './book.interfaces';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constants';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  console.log({ filters });

  const { searchTerm, ...filterData } = filters;
  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  console.log({ filterData });

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          if (bookRelationalFieldsMapper[key] === 'minPrice') {
            return {
              ['price']: {
                gte: Number((filterData as any)[key]),
              },
            };
          }
          if (bookRelationalFieldsMapper[key] === 'maxPrice') {
            return {
              ['price']: {
                lte: Number((filterData as any)[key]),
              },
            };
          } else {
            return {
              [bookRelationalFieldsMapper[key]]: {
                id: (filterData as any)[key],
              },
            };
          }
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
const getBooksByCategoryId = async (
  id: string,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: {
      category: {
        id,
      },
    },
    skip,
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: {
      category: {
        id,
      },
    },
  });

  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const bookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategoryId,
};
