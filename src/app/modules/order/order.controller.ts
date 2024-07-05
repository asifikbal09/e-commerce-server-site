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

const getAllOrder=catchAsync(async(req,res)=>{
let message :string;
if(req.query?.email){
    message="Orders fetched successfully for user email!"
}else{
    message="Orders fetched successfully!"
}

    const result = await OrderServices.getAllOrderFromDB(req.query)
    res.status(httpStatus.OK).json({
        success: true,
        message: message,
        data: result,
      });
})

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
