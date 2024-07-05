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

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductFromDB(productId, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.deleteProductFromDB(productId);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Product deleted successfully!',
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
