/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import QueryManager from '../../manager/queryManager';
import { ProductSearchableFields } from './product.constent';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { Types } from 'mongoose';

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

const getSingleProductFromDB = async (id: string) => {
  if ((await Product.isProductExists(id)) === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'The product is not found.');
  }
  const result = await Product.findById(id);
  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  if ((await Product.isProductExists(id)) === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  const result = await Product.findByIdAndUpdate(id,payload);

  return result;
};

const deleteProductFromDB=async(id:string)=>{
if((await Product.isProductExists(id))===null){
  throw new AppError(httpStatus.NOT_FOUND,"Product not found.")
}
const result = await Product.findByIdAndDelete(id)
return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFormDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB
};
