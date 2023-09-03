"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
// Define a schema for an individual ordered book entry
const orderSchema = zod_1.z.object({
    bookId: zod_1.z.string(),
    quantity: zod_1.z.number(), // Assuming quantity is a number
}, { required_error: 'ordered books required' });
// Define a schema for the entire orderedBooks array
const createOrder = zod_1.z.object({
    body: zod_1.z.object({
        orderedBooks: zod_1.z.array(orderSchema),
    }),
});
exports.orderValidation = {
    createOrder,
};
