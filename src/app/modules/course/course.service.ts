/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Types, isValidObjectId } from 'mongoose';
import QueryManager from '../../manager/queryManager';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const { startDate, endDate } = payload;
  const convertedStartDate: Date = new Date(startDate);
  const convertedEndDate: Date = new Date(endDate);

  const days = convertedEndDate.getTime() - convertedStartDate.getTime();

  payload.durationInWeeks = Math.ceil(days / (1000 * 60 * 60 * 24 * 7));

  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryManager(Course.find(), query)
    .pagination()
    .sortBy()
    .filterByPrice()
    .filterByTags()
    .filterByDate()
    .filterByLanguage()
    .filterByLevel()
    .filterByProvider()
    .filterByWeeks();
  const result = await courseQuery.modelQuery;

  const meta = {
    page: query.page || 1,
    limit: query.limit || 10,
    total: result.length,
  };

  return { result, meta };
};

const getCourseWithReviewFromDB = async (id: Types.ObjectId) => {
  const findCourseReview = await Course.aggregate([
    //stage-1
    //LookUp stage
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    //Stage-2
    //Match by id
    {
      $match: { _id: id },
    },
  ]);

  const course = await Course.findById(id);

  const reviews = findCourseReview[0].reviews;

  return { course, reviews };
};

const getTheBestCourseFromDB = async () => {
  const findBestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $unwind: '$reviews',
    },
    {
      $group: {
        _id: '$_id',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$reviews.rating' },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const course = await Course.findById(findBestCourse[0]._id);
  const averageRating = findBestCourse[0].averageRating;
  const reviewCount = findBestCourse[0].reviewCount;

  return { course, averageRating, reviewCount };
};

const updateCourseDataIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const basicDataUpdate = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    { new: true },
  );

  return basicDataUpdate;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getCourseWithReviewFromDB,
  getTheBestCourseFromDB,
  updateCourseDataIntoDB,
};
