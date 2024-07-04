import { z } from 'zod';
const variantSchema = z.object({
    type: z.string({
      required_error: "Variant type is required",
    }),
    value: z.string({
      required_error: "Variant value is required",
    }),
  });
  

  const inventorySchema = z.object({
    quantity: z.number({
      required_error: "Quantity is required",
    }),
    inStock: z.boolean({
      required_error: "In-stock status is required",
    }),
  });

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required',
    }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    price: z.number({
      required_error: 'Product price is required',
    }),
    tags: z.array(z.string(), {
      required_error: 'Tags are required',
    }),
    category: z.string({
      required_error: 'Product category is required',
    }),
    variants: z.array(variantSchema),
    inventory: inventorySchema,
  }),
});


export const ProductValidations={
    createProductValidationSchema
}