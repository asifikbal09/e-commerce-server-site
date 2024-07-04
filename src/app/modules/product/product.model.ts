import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

//sub schema of product
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

//sub schema of product
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

//Main schema fo product
const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    variants:{
        type:[variantSchema]
    },
    inventory: {
      type: inventorySchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.isCourseExists = async function (_id: string) {
  const existingProduct = await Product.findById({ _id });
  return existingProduct;
};

//product model
export const Product = model<TProduct, ProductModel>('Product', productSchema);
