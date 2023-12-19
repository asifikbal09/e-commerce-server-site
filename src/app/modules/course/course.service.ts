/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
  const allCourse = new QueryManager(Course.find(), query)
    .pagination()
    .sortBy()
    .filterByPrice()
    .filterByTags()
    .filterByDate();
  const result = await allCourse.modelQuery;

  const meta = {
    page: query.page || 1,
    limit: query.limit || 10,
    total: result.length,
  };

  return { result, meta };
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
};
