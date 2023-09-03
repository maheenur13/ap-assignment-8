import { z } from 'zod';

const createBook = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required!',
    }),
    author: z.string({
      required_error: 'author is required!',
    }),
    price: z.number({
      required_error: 'price is required!',
    }),
    genre: z.string({
      required_error: 'genre is required!',
    }),
    publicationDate: z.string({
      required_error: 'publicationDate is required!',
    }),
    categoryId: z.string({
      required_error: 'category id is required!',
    }),
  }),
});
const updateBook = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const bookValidation = {
  createBook,
  updateBook,
};
