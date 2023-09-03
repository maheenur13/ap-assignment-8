import { z } from 'zod';

const createCategory = z.object({
  body: z.object({
    title: z.string(),
  }),
});
const updateCategory = z.object({
  body: z.object({
    title: z.string(),
  }),
});

export const categoryValidation = {
  createCategory,
  updateCategory,
};
