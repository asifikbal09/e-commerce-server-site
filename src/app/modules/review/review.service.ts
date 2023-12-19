import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewForCourseIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReview = async () => {
  const result = await Review.aggregate([
    {
      $group:{}
    }
  ]);
  return result;
};

export const ReviewServices = {
  createReviewForCourseIntoDB,
  getAllReview,
};
