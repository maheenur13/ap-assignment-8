import { z } from 'zod';

// Define a schema for an individual ordered book entry
const orderSchema = z.object(
  {
    bookId: z.string(), // Assuming bookId is a string
    quantity: z.number(), // Assuming quantity is a number
  },
  { required_error: 'ordered books required' }
);

// Define a schema for the entire orderedBooks array
const createOrder = z.object({
  body: z.object({
    orderedBooks: z.array(orderSchema),
  }),
});

export const orderValidation = {
  createOrder,
};
