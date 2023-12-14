import { z } from 'zod';
// Zod validation Schema for creating new course

const tagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const levelEnum = z.enum(['Beginner', 'Intermediate', 'Advanced']);

const detailsValidationSchema = z.object({
  level: levelEnum,
  description: z.string(),
});

//main validation schema for creating new course
const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsValidationSchema,
  }),
});

//Zod validation schema for updating a course.
const updateTagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateDetailsValidationSchema = z.object({
  level: levelEnum.optional(),
  description: z.string().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsValidationSchema.optional(),
  }),
});

export const CourseValidation = {
  courseValidationSchema,
  updateCourseValidationSchema,
};
