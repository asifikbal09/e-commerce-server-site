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
    title: z.string().min(1, { message: "Title is required" }),
    instructor: z.string().min(1, { message: "Instructor is required" }),
    categoryId: z.string().min(1, { message: "Category ID is required" }),
    price: z.number().min(0, { message: "Price must be a non-negative number" }),
    tags: z.array(tagValidationSchema),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    language: z.string().min(1, { message: "Language is required" }),
    provider: z.string().min(1, { message: "Provider is required" }),
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
