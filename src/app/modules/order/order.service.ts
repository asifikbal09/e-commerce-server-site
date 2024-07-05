import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { startSession } from 'mongoose';
import { Order } from './order.model';
import QueryManager from '../../manager/queryManager';

const createOrderIntoDB = async (payload: TOrder) => {
  const { productId, quantity } = payload;
  const productInfo = await Product.isProductExists(productId.toString());
  if (productInfo === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }
  if (quantity > productInfo?.inventory?.quantity) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "Insufficient quantity available in inventory",
    );
  }
  const session = await startSession();

  try {
    session.startTransaction();

    const newOrder = await Order.create([payload ], {session});

    if (!newOrder) {
      throw new AppError(500, 'Failed to create order!');
    }
    const newQuantity = productInfo?.inventory?.quantity - quantity;
    const inventoryData = {
      inventory: {
        quantity: newQuantity,
        inStock: newQuantity === 0 ? false : true,
      },
    };

    await Product.findByIdAndUpdate(productId, inventoryData, { session, new: true });

    await session.commitTransaction();
    await session.endSession();

    return newOrder;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, 'Failed to create Order!');
  }
};

const getAllOrderFromDB=async(query:Record<string,unknown>)=>{
    const orderQuery = new QueryManager(Order.find(), query).filterByEmail();
    
      const result = await orderQuery.modelQuery;
      return result;
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB
};
