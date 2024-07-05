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

const getAllProduct = catchAsync(async (req, res) => {
  console.log(req.query)
  let massage: string = '';
  if (req.query?.searchTerm) {
    massage = `Products matching search term '${req.query?.searchTerm}' fetched successfully!`;
  } else {
    massage = 'Product fetched successfully!';
  }
  const result = await ProductServices.getAllProductFormDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    message: massage,
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
};
