import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
};
