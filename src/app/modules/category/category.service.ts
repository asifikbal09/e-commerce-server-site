import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryForCourseIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryServices = {
  createCategoryForCourseIntoDB,
  getAllCategoriesFromDB,
};
