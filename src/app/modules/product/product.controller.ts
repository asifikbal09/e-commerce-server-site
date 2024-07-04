import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const productInfo = req.body;
  const result = await ProductServices.createProductIntoDB(productInfo);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
