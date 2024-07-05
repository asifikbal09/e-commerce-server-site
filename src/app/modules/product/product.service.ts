/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import QueryManager from '../../manager/queryManager';
import { ProductSearchableFields } from './product.constent';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductFormDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryManager(Product.find(), query).search(
    ProductSearchableFields,
  );

  const result = await productQuery.modelQuery;
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFormDB
};
