import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTag } from './course.interface';

//Sub schema [tagSchema] for main schema tags property
const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

//Sub schema [detailsSchema] for main schema details property
const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//Main schema [courseSchema]
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [tagSchema],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    type: detailsSchema,
    required: true,
  },
});

//course model
export const Course = model<TCourse>('Course', courseSchema);
