import { z } from 'zod';

const variantSchema = z.object({
    type: z.string({
      required_error: "Variant type is required",
    }),
    value: z.string({
      required_error: "Variant value is required",
    }),
  });

const updateVariantSchema = z.object({
    type: z.string().optional(),
    value: z.string().optional(),
  }).optional();
  

  const inventorySchema = z.object({
    quantity: z.number({
      required_error: "Quantity is required",
    }),
    inStock: z.boolean({
      required_error: "In-stock status is required",
    }),
  });

  const updateInventorySchema = z.object({
    quantity: z.number().optional(),
    inStock: z.boolean().optional(),
  }).optional();

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
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(z.string().optional()).optional(),
    category: z.string().optional(),
    variants: z.array(updateVariantSchema).optional(),
    inventory: updateInventorySchema.optional(),
  }),
});



export const ProductValidations={
    createProductValidationSchema,
    updateProductValidationSchema
}