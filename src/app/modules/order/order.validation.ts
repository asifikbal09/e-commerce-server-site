import { Types } from 'mongoose';
import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    productId: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid ObjectId',
    }),
    price: z.number(),
    quantity: z.number(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
